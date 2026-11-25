import { useState } from "react";
import axios from "axios";

function CropRecommendation() {
  const [form, setForm] = useState({
    N: "",
    P: "",
    K: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check all fields
    for (const key in form) {
      if (form[key] === "") {
        alert("Please fill all fields.");
        return;
      }
    }

    try {
      setLoading(true);
      setResult(null);

      const response = await axios.post(
        "https://farmitra-bgf4.onrender.com/api/crop-ai",
        {
          N: Number(form.N),
          P: Number(form.P),
          K: Number(form.K),
          temperature: Number(form.temperature),
          humidity: Number(form.humidity),
          ph: Number(form.ph),
          rainfall: Number(form.rainfall),
        }
      );

      console.log("Crop AI Result:", response.data);

      setResult(response.data);

    } catch (error) {
      console.error("Crop Recommendation Error:", error);

      alert(
        error.response?.data?.message ||
        "Unable to get crop recommendation."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex justify-center items-center p-6">

      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-[600px]">

        {/* Heading */}

        <h1 className="text-3xl font-bold text-center text-green-700">
          🌾 FarmMitra Crop Recommendation
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Enter your soil and weather details to get an AI-based crop recommendation
        </p>


        {/* Form */}

        <form onSubmit={handleSubmit} className="mt-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Nitrogen */}

            <div>
              <label className="font-semibold text-gray-700">
                Nitrogen (N)
              </label>

              <input
                type="number"
                name="N"
                value={form.N}
                onChange={handleChange}
                placeholder="Example: 90"
                className="mt-1 w-full border rounded-lg p-3"
              />
            </div>


            {/* Phosphorus */}

            <div>
              <label className="font-semibold text-gray-700">
                Phosphorus (P)
              </label>

              <input
                type="number"
                name="P"
                value={form.P}
                onChange={handleChange}
                placeholder="Example: 42"
                className="mt-1 w-full border rounded-lg p-3"
              />
            </div>


            {/* Potassium */}

            <div>
              <label className="font-semibold text-gray-700">
                Potassium (K)
              </label>

              <input
                type="number"
                name="K"
                value={form.K}
                onChange={handleChange}
                placeholder="Example: 43"
                className="mt-1 w-full border rounded-lg p-3"
              />
            </div>


            {/* Temperature */}

            <div>
              <label className="font-semibold text-gray-700">
                Temperature (°C)
              </label>

              <input
                type="number"
                step="any"
                name="temperature"
                value={form.temperature}
                onChange={handleChange}
                placeholder="Example: 20.8"
                className="mt-1 w-full border rounded-lg p-3"
              />
            </div>


            {/* Humidity */}

            <div>
              <label className="font-semibold text-gray-700">
                Humidity (%)
              </label>

              <input
                type="number"
                step="any"
                name="humidity"
                value={form.humidity}
                onChange={handleChange}
                placeholder="Example: 82"
                className="mt-1 w-full border rounded-lg p-3"
              />
            </div>


            {/* pH */}

            <div>
              <label className="font-semibold text-gray-700">
                Soil pH
              </label>

              <input
                type="number"
                step="any"
                name="ph"
                value={form.ph}
                onChange={handleChange}
                placeholder="Example: 6.5"
                className="mt-1 w-full border rounded-lg p-3"
              />
            </div>


            {/* Rainfall */}

            <div className="md:col-span-2">

              <label className="font-semibold text-gray-700">
                Rainfall (mm)
              </label>

              <input
                type="number"
                step="any"
                name="rainfall"
                value={form.rainfall}
                onChange={handleChange}
                placeholder="Example: 202"
                className="mt-1 w-full border rounded-lg p-3"
              />

            </div>

          </div>


          {/* Button */}

          <button
            type="submit"
            disabled={loading}
            className={`mt-6 w-full text-white py-3 rounded-lg font-semibold ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading
              ? "🤖 Analyzing..."
              : "🌾 Recommend Crop"}
          </button>

        </form>


        {/* Result */}

        {result && result.success && (

          <div className="mt-6 bg-green-50 border border-green-200 p-6 rounded-xl text-center">

            <h2 className="text-xl font-bold text-green-700">
              🌱 AI Recommendation
            </h2>

            <p className="text-gray-600 mt-3">
              Based on your soil and weather conditions:
            </p>

            <p className="text-3xl font-bold text-green-800 mt-3 capitalize">
              🌾 {result.crop}
            </p>

            <p className="text-green-700 mt-3">
              {result.message}
            </p>

          </div>

        )}


        {/* Error */}

        {result && !result.success && (

          <div className="mt-6 bg-red-50 border border-red-200 p-5 rounded-xl">

            <h2 className="font-bold text-red-700">
              Recommendation Failed
            </h2>

            <p className="text-red-600 mt-2">
              {result.message || "Unable to recommend crop."}
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default CropRecommendation;