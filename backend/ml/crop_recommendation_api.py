from flask import Flask, request, jsonify
from flask_cors import CORS

import os
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

# Model path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(
    BASE_DIR,
    "model",
    "crop_recommendation_model.pkl"
)

# Load model
print("Loading Crop Recommendation AI...")

model = joblib.load(MODEL_PATH)

print("Crop Recommendation AI loaded successfully!")


# Crop recommendation API
@app.route("/recommend", methods=["POST"])
def recommend():

    try:
        data = request.get_json()

        print("Received data:", data)

        N = float(data["N"])
        P = float(data["P"])
        K = float(data["K"])

        temperature = float(data["temperature"])
        humidity = float(data["humidity"])

        ph = float(data["ph"])
        rainfall = float(data["rainfall"])

        input_data = np.array([[
            N,
            P,
            K,
            temperature,
            humidity,
            ph,
            rainfall
        ]])

        prediction = model.predict(input_data)

        crop = prediction[0]

        print("Recommended Crop:", crop)

        return jsonify({
            "success": True,
            "crop": str(crop),
            "message": "Crop recommendation generated successfully"
        })

    except Exception as e:

        print("Prediction error:", str(e))

        return jsonify({
            "success": False,
            "message": "Crop recommendation failed",
            "error": str(e)
        }), 500


if __name__ == "__main__":

    print("====================================")
    print("     AGRITWIN CROP AI SERVER")
    print("====================================")
    print("Model:", MODEL_PATH)
    print("Server: http://127.0.0.1:5002")
    print("====================================")

    app.run(
        host="0.0.0.0",
        port=5002,
        debug=True
    )