from flask import Flask, request, jsonify
from flask_cors import CORS

import os
import joblib
import numpy as np


# ==========================================
# FarmMitra AI - Crop Recommendation
# ==========================================

app = Flask(__name__)
CORS(app)


# ==========================================
# Model Path
# ==========================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(
    BASE_DIR,
    "model",
    "crop_recommendation_model.pkl"
)


# ==========================================
# Load Model
# ==========================================

print("Loading Crop Recommendation AI...")

model = joblib.load(MODEL_PATH)

print("Crop Recommendation AI loaded successfully!")


# ==========================================
# Prediction API
# ==========================================

@app.route("/recommend", methods=["POST"])
def recommend():

    try:

        data = request.get_json()

        print("Received data:", data)


        # ==================================
        # Get values
        # ==================================

        N = float(data["N"])
        P = float(data["P"])
        K = float(data["K"])

        temperature = float(data["temperature"])
        humidity = float(data["humidity"])

        ph = float(data["ph"])
        rainfall = float(data["rainfall"])


        # ==================================
        # Create input
        # ==================================

        input_data = np.array([[
            N,
            P,
            K,
            temperature,
            humidity,
            ph,
            rainfall
        ]])


        # ==================================
        # Predict
        # ==================================

        prediction = model.predict(input_data)

        crop = prediction[0]


        # ==================================
        # Response
        # ==================================

        result = {

            "success": True,

            "crop": str(crop),

            "message": "Crop recommendation generated successfully"

        }


        print("\n==============================")
        print("Crop Recommendation")
        print("==============================")
        print("Recommended Crop:", crop)
        print("==============================\n")


        return jsonify(result)


    except Exception as e:

        print("Prediction error:", str(e))

        return jsonify({

            "success": False,

            "message": "Crop recommendation failed",

            "error": str(e)

        }), 500


# ==========================================
# Start Server
# ==========================================

if __name__ == "__main__":

    print("\n====================================")
    print("     FARMMITRA CROP AI SERVER")
    print("====================================")
    print("Model:", MODEL_PATH)
    print("Server: http://127.0.0.1:5002")
    print("====================================\n")


    app.run(
        host="0.0.0.0",
        port=5002,
        debug=True
    )