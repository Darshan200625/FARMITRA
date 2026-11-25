
from flask import Flask, request, jsonify
from flask_cors import CORS

import os
import json
import numpy as np
import tensorflow as tf

from PIL import Image

app = Flask(__name__)
CORS(app)

# ==========================================
# MODEL PATHS
# ==========================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(
    BASE_DIR,
    "model",
    "farmmitra_plant_disease_model.keras"
)

CLASS_PATH = os.path.join(
    BASE_DIR,
    "model",
    "class_names.json"
)

# ==========================================
# LOAD DISEASE MODEL
# ==========================================

print("Loading FarmMitra Plant Disease AI...")

if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(
        f"Disease model not found: {MODEL_PATH}"
    )

if not os.path.exists(CLASS_PATH):
    raise FileNotFoundError(
        f"Class names file not found: {CLASS_PATH}"
    )

model = tf.keras.models.load_model(
    MODEL_PATH,
    compile=False
)

with open(CLASS_PATH, "r") as file:
    class_names = json.load(file)

print("Disease model loaded successfully!")
print("Disease classes:", len(class_names))

# ==========================================
# TREATMENT INFORMATION
# ==========================================

def get_advice(disease):

    advice = {
        "Tomato___Early_blight": {
            "treatment": (
                "Remove infected leaves and use an "
                "appropriate fungicide according to "
                "the product label."
            ),
            "prevention": (
                "Avoid overhead watering, maintain "
                "good airflow, and remove infected "
                "plant material."
            )
        },

        "Tomato___Late_blight": {
            "treatment": (
                "Remove severely infected plant parts "
                "and use an appropriate fungicide "
                "according to the product label."
            ),
            "prevention": (
                "Avoid prolonged leaf wetness and "
                "improve air circulation."
            )
        },

        "Tomato___healthy": {
            "treatment": "No disease treatment is required.",
            "prevention": (
                "Continue proper watering, nutrition, "
                "sanitation, and regular crop inspection."
            )
        }
    }

    return advice.get(
        disease,
        {
            "treatment": (
                "Consult a local agricultural expert "
                "for appropriate treatment."
            ),
            "prevention": (
                "Monitor the crop regularly and remove "
                "severely infected plant material."
            )
        }
    )

# ==========================================
# HEALTH CHECK
# ==========================================

@app.route("/", methods=["GET"])
def home():

    return jsonify({
        "success": True,
        "message": "FarmMitra Disease Detection AI is Running",
        "service": "Plant Disease Detection",
        "model_loaded": True,
        "classes": len(class_names)
    })

# ==========================================
# DISEASE PREDICTION API
# ==========================================

@app.route("/predict", methods=["POST"])
def predict():

    try:

        if "image" not in request.files:
            return jsonify({
                "success": False,
                "message": "No image uploaded"
            }), 400

        image_file = request.files["image"]

        if image_file.filename == "":
            return jsonify({
                "success": False,
                "message": "No image selected"
            }), 400

        # Open image
        image = Image.open(image_file).convert("RGB")

        # Resize image
        image = image.resize((224, 224))

        # Convert to NumPy
        image_array = np.array(image)

        image_array = np.expand_dims(
            image_array,
            axis=0
        )

        # Prediction
        predictions = model.predict(
            image_array,
            verbose=0
        )

        predicted_index = int(
            np.argmax(predictions[0])
        )

        if predicted_index >= len(class_names):
            raise ValueError("Prediction class index is invalid")

        confidence = float(
            predictions[0][predicted_index]
        ) * 100

        disease = class_names[predicted_index]

        advice = get_advice(disease)

        result = {
            "success": True,
            "disease": disease,
            "confidence": round(confidence, 2),
            "treatment": advice["treatment"],
            "prevention": advice["prevention"]
        }

        print("Disease:", disease)
        print("Confidence:", round(confidence, 2), "%")

        return jsonify(result)

    except Exception as error:

        print("Disease prediction error:", str(error))

        return jsonify({
            "success": False,
            "message": "Prediction failed",
            "error": str(error)
        }), 500

# ==========================================
# START SERVER
# ==========================================

if __name__ == "__main__":

    port = int(os.environ.get("PORT", 5001))

    print("FarmMitra Disease Detection Server")
    print("Starting on port:", port)

    app.run(
        host="0.0.0.0",
        port=port,
        debug=False
    )
