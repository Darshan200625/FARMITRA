import { useState } from "react";

function YieldPrediction() {
  const [area, setArea] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [result, setResult] = useState("");

  const predictYield = () => {
    if (!area || !rainfall) {
      alert("Please fill all fields");
      return;
    }

    const prediction = (Number(area) * Number(rainfall) * 0.12).toFixed(2);

    setResult(`${prediction} Quintals`);
  };

  return (
    <div className="min-h-screen bg-purple-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-xl w-[500px]">

        <h1 className="text-3xl font-bold text-center text-purple-700">
          📈 Yield Prediction
        </h1>

        <input
          type="number"
          placeholder="Farm Area (Acres)"
          className="border w-full p-3 rounded-lg mt-6"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />

        <input
          type="number"
          placeholder="Rainfall (mm)"
          className="border w-full p-3 rounded-lg mt-5"
          value={rainfall}
          onChange={(e) => setRainfall(e.target.value)}
        />

        <button
          onClick={predictYield}
          className="bg-purple-700 text-white w-full py-3 rounded-lg mt-6"
        >
          Predict Yield
        </button>

        {result && (
          <div className="mt-6 bg-purple-100 p-4 rounded-lg text-center text-xl font-bold">
            Estimated Yield: {result}
          </div>
        )}

      </div>
    </div>
  );
}

export default YieldPrediction;