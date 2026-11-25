
import { useState } from "react";
import axios from "axios";

function MarketPrice() {
  const [crop, setCrop] = useState("");
  const [district, setDistrict] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const crops = [
    "Arecanut",
    "Ragi",
    "Maize",
    "Paddy",
    "Jowar",
    "Bajra",
    "Wheat",
    "Sugarcane",
    "Groundnut",
    "Sunflower",
    "Cotton",
    "Coconut",
    "Black Pepper",
    "Turmeric",
    "Ginger",
    "Coffee",
    "Red Gram",
    "Green Gram",
    "Black Gram",
    "Bengal Gram",
    "Tomato",
    "Onion",
    "Potato",
    "Chilli",
    "Banana",
    "Mango",
    "Cabbage",
    "Cauliflower",
    "Beans",
    "Carrot",
    "Copra",
    "Coco",
  ];

  const getPrice = async () => {
    if (!crop) {
      setError("Please select a crop.");
      return;
    }

    setLoading(true);
    setError("");
    setRecords([]);

    try {
      const response = await axios.get(
        "https://farmitra-bgf4.onrender.com/api/market",
        {
          params: {
            crop,
            ...(district.trim() && { district: district.trim() }),
          },
          timeout: 25000,
        }
      );

      if (
        response.data.success &&
        response.data.data &&
        response.data.data.length > 0
      ) {
        setRecords(response.data.data);
      } else {
        setError(
          "No market records found for this crop and location. Try another crop or district."
        );
      }
    } catch (err) {
      console.error(
        "Market Price Error:",
        err.response?.data || err.message
      );

      setError(
        err.response?.data?.message ||
        "Unable to fetch market prices. Please check your backend and API connection."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 p-5 md:p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-8">

        <h1 className="text-3xl font-bold text-center text-yellow-700">
          💰 Live Market Price Dashboard
        </h1>

        <p className="text-center text-gray-600 mt-3">
          Check agricultural mandi prices in Karnataka.
        </p>

        {/* Crop Selection */}
        <div className="mt-8">
          <label className="block font-semibold mb-2">
            Select Crop
          </label>

          <select
            className="border border-gray-300 w-full p-3 rounded-lg"
            value={crop}
            onChange={(e) => {
              setCrop(e.target.value);
              setRecords([]);
              setError("");
            }}
          >
            <option value="">Select Crop</option>

            {crops.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* District */}
        <div className="mt-5">
          <label className="block font-semibold mb-2">
            District (Optional)
          </label>

          <input
            type="text"
            placeholder="Example: Tumakuru"
            className="border border-gray-300 w-full p-3 rounded-lg"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          />
        </div>

        {/* Search Button */}
        <button
          onClick={getPrice}
          disabled={loading}
          className="bg-yellow-600 text-white w-full py-3 rounded-lg mt-6 hover:bg-yellow-700 disabled:opacity-50"
        >
          {loading ? "Fetching Market Prices..." : "Check Live Market Prices"}
        </button>

        {/* Error */}
        {error && (
          <div className="mt-6 bg-red-100 text-red-700 p-4 rounded-lg">
            {error}
          </div>
        )}

        {/* Market Results */}
        {records.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-yellow-800 mb-4">
              Market Results: {crop}
            </h2>

            <p className="text-sm text-gray-600 mb-4">
              {records.length} market record(s) returned.
              Prices are in ₹ per quintal.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {records.map((item, index) => (
                <div
                  key={index}
                  className="border border-yellow-200 bg-yellow-50 rounded-xl p-5 shadow-sm"
                >
                  <h3 className="text-xl font-bold text-yellow-800">
                    {item.market || "Market not specified"}
                  </h3>

                  <p className="text-gray-600 mt-1">
                    {item.district}, {item.state}
                  </p>

                  <div className="grid grid-cols-3 gap-2 mt-5">
                    <div className="bg-white rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-500">Minimum</p>
                      <p className="font-bold text-green-700">
                        ₹{item.minPrice ?? "N/A"}
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-500">Maximum</p>
                      <p className="font-bold text-blue-700">
                        ₹{item.maxPrice ?? "N/A"}
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-500">Modal</p>
                      <p className="font-bold text-orange-700">
                        ₹{item.modalPrice ?? "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 text-sm text-gray-600">
                    <p>
                      <strong>Commodity:</strong> {item.commodity}
                    </p>
                    <p>
                      <strong>Variety:</strong> {item.variety || "N/A"}
                    </p>
                    <p>
                      <strong>Arrival Date:</strong> {item.arrivalDate || "N/A"}
                    </p>
                    <p className="mt-2 font-semibold">
                      Price unit: {item.unit || "₹/Quintal"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="text-xs text-gray-500 text-center mt-8">
          Market prices are based on reported mandi data.
          Availability and update dates depend on the source dataset.
        </p>
      </div>
    </div>
  );
}

export default MarketPrice;
