import { useState } from "react";
import axios from "axios";

function FertilizerTest() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const testFertilizer = async () => {
    try {
      setLoading(true);
      setResult(null);

      const response = await axios.post(
        "http://localhost:5000/api/fertilizer",
        {
          crop: "Ragi",
          nitrogen: 30,
          phosphorus: 45,
          potassium: 25,
          ph: 6.5,
          soilCondition: 60,
        }
      );

      console.log("Fertilizer API Response:", response.data);

      setResult(response.data);
    } catch (error) {
      console.error("Fertilizer API Error:", error);

      setResult({
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Fertilizer API failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-100 p-8">

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold text-green-700 text-center mb-8">
          🧪 Fertilizer Recommendation Test
        </h1>

        <button
          onClick={testFertilizer}
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-500"
        >
          {loading ? "Testing..." : "Test Fertilizer AI"}
        </button>

        {result && (
          <div className="mt-8">

            <h2 className="text-xl font-bold text-green-700 mb-4">
              API Result
            </h2>

            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>

          </div>
        )}

      </div>

    </div>
  );
}

export default FertilizerTest;