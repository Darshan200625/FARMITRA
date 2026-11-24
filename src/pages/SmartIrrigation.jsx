import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SmartIrrigation() {
  const navigate = useNavigate();

  const [moisture, setMoisture] = useState("");
  const [prediction, setPrediction] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);

  const checkIrrigation = async () => {
    if (moisture === "") {
      alert("Please enter soil moisture.");
      return;
    }

    try {
      setLoading(true);
      setPrediction("");
      setRecommendation("");

      const res = await axios.post(
        "http://localhost:5000/api/irrigation",
        {
          moisture: Number(moisture),
        }
      );

      setPrediction(res.data.prediction);
      setRecommendation(res.data.recommendation);
    } catch (err) {
      console.error("Irrigation error:", err);

      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Unable to connect to AI Server");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cyan-100 p-8">

      <button
        onClick={() => navigate("/dashboard")}
        className="bg-cyan-700 text-white px-4 py-2 rounded mb-8 hover:bg-cyan-800"
      >
        ← Back
      </button>

      <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center text-cyan-700 mb-8">
          💧 Smart Irrigation AI
        </h1>

        <label className="block font-semibold mb-2">
          Soil Moisture (%)
        </label>

        <input
          type="number"
          min="0"
          max="100"
          placeholder="Enter moisture (0–100)"
          value={moisture}
          onChange={(e) => setMoisture(e.target.value)}
          className="w-full border p-3 rounded mb-6"
        />

        <button
          onClick={checkIrrigation}
          disabled={loading}
          className="w-full bg-cyan-600 text-white py-3 rounded hover:bg-cyan-700 disabled:opacity-50"
        >
          {loading ? "Checking..." : "Check Irrigation"}
        </button>

        {prediction && (
          <div className="mt-8 bg-cyan-100 rounded-lg p-5">

            <h2 className="text-xl font-bold text-cyan-700 text-center">
              💧 AI Recommendation
            </h2>

            <p className="text-2xl font-bold mt-4 text-center">
              {prediction}
            </p>

            {recommendation && (
              <p className="mt-4 text-gray-700 text-center">
                {recommendation}
              </p>
            )}

            <div className="mt-5 text-sm text-gray-600 text-center">
              Soil Moisture: <strong>{moisture}%</strong>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default SmartIrrigation;