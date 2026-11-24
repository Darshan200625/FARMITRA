import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function WeatherDashboard() {
  const navigate = useNavigate();

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    if (!city.trim()) {
      setError("Please enter city name");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const url =
        "http://localhost:5000/api/weather/" +
        encodeURIComponent(city.trim());

      console.log("Calling:", url);

      const response = await axios.get(url);

      console.log("Backend response:", response.data);

      if (response.data.success) {
        setWeather(response.data);
      } else {
        setError(response.data.message || "Weather not available");
      }
    } catch (error) {
      console.error("FULL WEATHER ERROR:", error);

      if (error.response) {
        setError(
          "Backend error: " +
            (error.response.data?.message || error.response.status)
        );
      } else if (error.request) {
        setError(
          "Cannot connect to backend. Check http://localhost:5000"
        );
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-100 p-8">

      <button
        onClick={() => navigate("/dashboard")}
        className="bg-green-700 text-white px-5 py-2 rounded-lg mb-8"
      >
        ← Back to Dashboard
      </button>

      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
          🌦️ Weather Dashboard
        </h1>

        <div className="flex gap-3">

          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getWeather();
              }
            }}
            className="flex-1 border border-gray-300 p-3 rounded-lg"
          />

          <button
            onClick={getWeather}
            disabled={loading}
            className="bg-green-600 text-white px-5 py-3 rounded-lg"
          >
            {loading ? "Loading..." : "Search"}
          </button>

        </div>

        {error && (
          <div className="mt-6 bg-red-100 text-red-700 p-4 rounded-lg">
            ❌ {error}
          </div>
        )}

        {weather && (
          <div className="mt-8">

            <h2 className="text-3xl font-bold text-center text-green-700">
              📍 {weather.city}
            </h2>

            <div className="bg-green-100 rounded-xl p-6 mt-6 text-center">

              <p className="text-5xl font-bold text-green-700">
                {weather.temperature}°C
              </p>

              <p className="text-xl mt-3">
                🌤️ {weather.description}
              </p>

            </div>

            <div className="grid grid-cols-3 gap-3 mt-5">

              <div className="bg-blue-100 p-4 rounded-xl text-center">
                💧
                <p className="font-bold">
                  {weather.humidity}%
                </p>
                <p>Humidity</p>
              </div>

              <div className="bg-cyan-100 p-4 rounded-xl text-center">
                🌤️
                <p className="font-bold">
                  {weather.weather}
                </p>
                <p>Weather</p>
              </div>

              <div className="bg-yellow-100 p-4 rounded-xl text-center">
                💨
                <p className="font-bold">
                  {weather.wind}
                </p>
                <p>Wind</p>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default WeatherDashboard;