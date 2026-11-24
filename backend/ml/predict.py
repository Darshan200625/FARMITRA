from flask import Flask, request, jsonify
from flask_cors import CORS

import os
import json
import numpy as np
import tensorflow as tf
import joblib
import pandas as pd

from PIL import Image


# ==========================================
# FarmMitra AI - Flask AI Server
# ==========================================

app = Flask(__name__)
CORS(app)


# ==========================================
# Paths
# ==========================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Plant disease model
MODEL_PATH = os.path.join(
    BASE_DIR,
    "model",
    "farmmitra_plant_disease_model.keras"
)

# Disease class names
CLASS_PATH = os.path.join(
    BASE_DIR,
    "model",
    "class_names.json"
)

# Crop recommendation model
CROP_MODEL_PATH = os.path.join(
    BASE_DIR,
    "model",
    "crop_recommendation_model.pkl"
)


# ==========================================
# Load Plant Disease AI Model
# ==========================================

print("\nLoading FarmMitra Plant Disease AI model...")

model = tf.keras.models.load_model(
    MODEL_PATH,
    compile=False
)

print("FarmMitra Plant Disease AI model loaded successfully!")


# ==========================================
# Load Disease Class Names
# ==========================================

with open(CLASS_PATH, "r") as f:
    class_names = json.load(f)

print("Number of disease classes:", len(class_names))


# ==========================================
# Load Crop Recommendation Model
# ==========================================

print("\nLoading Crop Recommendation AI model...")

crop_model = joblib.load(
    CROP_MODEL_PATH
)

print("Crop Recommendation AI model loaded successfully!")


# ==========================================
# Disease Treatment Information
# ==========================================

def get_advice(disease):

    advice = {

        "Tomato___Early_blight": {
            "treatment": "Remove infected leaves and use an appropriate fungicide according to the product label.",
            "prevention": "Avoid overhead watering, maintain good airflow, and remove infected plant material."
        },

        "Tomato___Late_blight": {
            "treatment": "Remove severely infected plant parts and use an appropriate fungicide according to the product label.",
            "prevention": "Avoid prolonged leaf wetness and improve air circulation."
        },

        "Tomato___healthy": {
            "treatment": "No disease treatment is required.",
            "prevention": "Continue proper watering, nutrition, sanitation, and regular crop inspection."
        }

    }

    return advice.get(
        disease,
        {
            "treatment": "Consult a local agricultural expert for the appropriate treatment.",
            "prevention": "Monitor the crop regularly and remove severely infected plant material."
        }
    )


# ==========================================
# PLANT DISEASE PREDICTION API
# ==========================================

@app.route("/predict", methods=["POST"])
def predict():

    try:

        # Check image
        if "image" not in request.files:

            return jsonify({
                "success": False,
                "message": "No image uploaded"
            }), 400


        image_file = request.files["image"]


        # Check filename
        if image_file.filename == "":

            return jsonify({
                "success": False,
                "message": "No image selected"
            }), 400


        # ==================================
        # Open Image
        # ==================================

        image = Image.open(
            image_file
        ).convert("RGB")

        print(
            "Disease image received:",
            image_file.filename
        )


        # ==================================
        # Resize Image
        # ==================================

        image = image.resize(
            (224, 224)
        )


        # ==================================
        # Convert Image to NumPy
        # ==================================

        image_array = np.array(image)

        image_array = np.expand_dims(
            image_array,
            axis=0
        )


        # ==================================
        # AI Prediction
        # ==================================

        predictions = model.predict(
            image_array,
            verbose=0
        )


        # ==================================
        # Get Prediction
        # ==================================

        predicted_index = np.argmax(
            predictions[0]
        )


        confidence = float(
            predictions[0][predicted_index]
        ) * 100


        disease = class_names[
            predicted_index
        ]


        # ==================================
        # Get Treatment Advice
        # ==================================

        advice = get_advice(
            disease
        )


        # ==================================
        # Response
        # ==================================

        result = {

            "success": True,

            "disease": disease,

            "confidence": round(
                confidence,
                2
            ),

            "treatment": advice[
                "treatment"
            ],

            "prevention": advice[
                "prevention"
            ]

        }


        # ==================================
        # Console
        # ==================================

        print("\n================================")
        print("FarmMitra Plant Disease Prediction")
        print("================================")

        print(
            "Disease:",
            disease
        )

        print(
            "Confidence:",
            round(
                confidence,
                2
            ),
            "%"
        )

        print("================================\n")


        return jsonify(
            result
        )


    except Exception as e:

        print(
            "Disease prediction error:",
            str(e)
        )

        return jsonify({

            "success": False,

            "message": "Prediction failed",

            "error": str(e)

        }), 500


# ==========================================
# CROP RECOMMENDATION API
# ==========================================

@app.route(
    "/crop-recommend",
    methods=["POST"]
)
def crop_recommend():

    try:

        # ==================================
        # Get JSON Data
        # ==================================

        data = request.get_json()


        if not data:

            return jsonify({

                "success": False,

                "message": "No data received"

            }), 400


        # ==================================
        # Required Fields
        # ==================================

        required_fields = [

            "N",
            "P",
            "K",
            "temperature",
            "humidity",
            "ph",
            "rainfall"

        ]


        # ==================================
        # Check Missing Fields
        # ==================================

        for field in required_fields:

            if field not in data:

                return jsonify({

                    "success": False,

                    "message": f"Missing field: {field}"

                }), 400


        # ==================================
        # Prepare Input
        # ==================================

        input_data = pd.DataFrame(

            [[

                float(data["N"]),

                float(data["P"]),

                float(data["K"]),

                float(data["temperature"]),

                float(data["humidity"]),

                float(data["ph"]),

                float(data["rainfall"])

            ]],

            columns=[

                "N",
                "P",
                "K",
                "temperature",
                "humidity",
                "ph",
                "rainfall"

            ]

        )


        # ==================================
        # Crop AI Prediction
        # ==================================

        prediction = crop_model.predict(
            input_data
        )


        crop = prediction[0]


        # ==================================
        # Console
        # ==================================

        print("\n================================")
        print("Crop Recommendation AI")
        print("================================")

        print(
            "N:",
            data["N"]
        )

        print(
            "P:",
            data["P"]
        )

        print(
            "K:",
            data["K"]
        )

        print(
            "Temperature:",
            data["temperature"]
        )

        print(
            "Humidity:",
            data["humidity"]
        )

        print(
            "pH:",
            data["ph"]
        )

        print(
            "Rainfall:",
            data["rainfall"]
        )

        print(
            "Recommended Crop:",
            crop
        )

        print("================================\n")


        # ==================================
        # Response
        # ==================================

        return jsonify({

            "success": True,

            "crop": crop

        })


    except Exception as e:

        print(
            "Crop recommendation error:",
            str(e)
        )

        return jsonify({

            "success": False,

            "message": "Crop recommendation failed",

            "error": str(e)

        }), 500


# ==========================================
# Health Check
# ==========================================

@app.route(
    "/",
    methods=["GET"]
)
def home():

    return jsonify({

        "success": True,

        "message": "FarmMitra AI Server is Running",

        "services": [

            "Plant Disease Detection",

            "Crop Recommendation"

        ]

    })


# ==========================================
# Start Flask Server
# ==========================================

if __name__ == "__main__":

    print("\n====================================")
    print("       FARMMITRA AI SERVER")
    print("====================================")

    print(
        "Disease Model:",
        MODEL_PATH
    )

    print(
        "Crop Model:",
        CROP_MODEL_PATH
    )

    print(
        "Disease Classes:",
        len(class_names)
    )

    print(
        "Server: http://127.0.0.1:5001"
    )

    print("====================================\n")


    app.run(

        host="0.0.0.0",

        port=5001,

        debug=True

    )