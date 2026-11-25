import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Irrigation() {
  const navigate = useNavigate();

  const [moisture, setMoisture] = useState("");
  const [result, setResult] = useState("");

  const handlePredict = async () => {
    try {
      const res = await axios.post(
        "https://farmitra-bgf4.onrender.com/api/irrigation",
        {
          moisture,
        }
      );

      setResult(res.data.prediction);
    } catch (err) {
      alert("Unable to connect to AI Server");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 p-8">

      <button
        onClick={() => navigate("/dashboard")}
        className="bg-blue-700 text-white px-4 py-2 rounded mb-8"
      >
        ← Back to Dashboard
      </button>

      <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
          💧 Irrigation Prediction AI
        </h1>

        <input
          type="number"
          placeholder="Soil Moisture (%)"
          value={moisture}
          onChange={(e) => setMoisture(e.target.value)}
          className="w-full border p-3 rounded mb-6"
        />

        <button
          onClick={handlePredict}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
        >
          Predict Irrigation
        </button>

        {result && (
          <div className="mt-8 bg-blue-100 p-5 rounded text-center">
            <h2 className="text-xl font-bold text-blue-700">
              AI Prediction
            </h2>

            <p className="text-2xl mt-3 font-bold">
              {result}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Irrigation;