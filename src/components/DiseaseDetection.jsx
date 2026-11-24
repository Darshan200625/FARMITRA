import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DiseaseDetection() {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const handleDetect = async () => {
    if (!image) {
      alert("Please select a leaf image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/disease",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Disease Detection Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-100 p-8">

      <button
        onClick={() => navigate("/dashboard")}
        className="bg-green-700 text-white px-4 py-2 rounded mb-8"
      >
        ← Back to Dashboard
      </button>

      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-4xl font-bold text-center text-green-700 mb-8">
          🦠 Disease Detection AI
        </h1>

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="mb-6"
        />

        {preview && (
          <img
            src={preview}
            alt="Leaf Preview"
            className="w-full h-72 object-cover rounded-lg border mb-6"
          />
        )}

        <button
          onClick={handleDetect}
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          {loading ? "Detecting..." : "Detect Disease"}
        </button>

        {result && (
          <div className="mt-8 bg-green-50 border border-green-300 rounded-lg p-6">

            <h2 className="text-2xl font-bold text-green-700 mb-4">
              🌿 Detection Result
            </h2>

            <p className="mb-2">
              <strong>Disease:</strong> {result.disease}
            </p>

            <p className="mb-2">
              <strong>Confidence:</strong> {result.confidence}
            </p>

            <p className="mb-2">
              <strong>Treatment:</strong> {result.treatment}
            </p>

            <p>
              <strong>Prevention:</strong> {result.prevention}
            </p>

          </div>
        )}

      </div>
    </div>
  );
}

export default DiseaseDetection;