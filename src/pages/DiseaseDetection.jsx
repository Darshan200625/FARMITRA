import { useState } from "react";
import axios from "axios";

function DiseaseDetection() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // ==============================
  // Select Leaf Image
  // ==============================
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  // ==============================
  // Detect Disease
  // ==============================
  const handleDetect = async () => {
    if (!image) {
      alert("Please select a leaf image.");
      return;
    }

    const formData = new FormData();

    formData.append("image", image);

    try {
      setLoading(true);
      setResult(null);

      // Send image to FarmMitra Flask AI
      const res = await axios.post(
        "http://localhost:5001/predict",
        formData
      );

      console.log("FarmMitra AI Result:", res.data);

      setResult(res.data);

    } catch (err) {
      console.error("Disease Detection Error:", err);

      if (err.response) {
        alert(
          err.response.data?.message ||
          "Disease detection failed."
        );
      } else {
        alert(
          "Cannot connect to FarmMitra AI server. Make sure Flask is running."
        );
      }

    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // Page
  // ==============================

  return (
    <div className="min-h-screen bg-green-50 flex justify-center items-center p-6">

      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-[500px]">

        {/* Heading */}

        <h1 className="text-3xl font-bold text-center text-green-700">
          🌱 FarmMitra Disease Detection
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Upload a plant leaf image to detect diseases using AI
        </p>


        {/* Image Upload */}

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="mt-6 w-full border rounded-lg p-2"
        />


        {/* Image Preview */}

        {preview && (
          <div className="mt-6">

            <p className="font-semibold text-gray-700 mb-2">
              Selected Leaf
            </p>

            <img
              src={preview}
              alt="Selected plant leaf"
              className="rounded-xl h-72 w-full object-cover border"
            />

          </div>
        )}


        {/* Detect Button */}

        <button
          onClick={handleDetect}
          disabled={loading || !image}
          className={`mt-6 w-full text-white py-3 rounded-lg font-semibold transition ${
            loading || !image
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "🤖 Detecting..." : "🔍 Detect Disease"}
        </button>


        {/* Result */}

        {result && result.success && (

          <div className="mt-6 bg-green-50 border border-green-200 p-5 rounded-xl">

            <h2 className="text-xl font-bold text-green-700 mb-4">
              🌱 Detection Result
            </h2>


            {/* Disease */}

            <div className="mb-3">

              <p className="text-gray-600 text-sm">
                Disease
              </p>

              <p className="font-bold text-lg text-gray-800">
                {result.disease}
              </p>

            </div>


            {/* Confidence */}

            <div className="mb-3">

              <p className="text-gray-600 text-sm">
                AI Confidence
              </p>

              <p className="font-bold text-lg text-green-700">
                {result.confidence}%
              </p>

            </div>


            {/* Treatment */}

            <div className="mb-3">

              <p className="text-gray-600 text-sm">
                Treatment
              </p>

              <p className="text-gray-800">
                {result.treatment}
              </p>

            </div>


            {/* Prevention */}

            <div>

              <p className="text-gray-600 text-sm">
                Prevention
              </p>

              <p className="text-gray-800">
                {result.prevention}
              </p>

            </div>

          </div>

        )}


        {/* Error Result */}

        {result && !result.success && (

          <div className="mt-6 bg-red-50 border border-red-200 p-5 rounded-xl">

            <h2 className="font-bold text-red-700">
              Detection Failed
            </h2>

            <p className="text-red-600 mt-2">
              {result.message || "Unable to detect disease."}
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default DiseaseDetection;