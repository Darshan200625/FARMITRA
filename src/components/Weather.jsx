import { useEffect, useState } from "react";
import axios from "axios";
import "./Weather.css";

function Weather() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Tumakuru");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        `http://localhost:5000/api/weather/${encodeURIComponent(
          city.trim()
        )}`
      );

      console.log("Weather response:", res.data);

      if (res.data.success) {
        setWeather(res.data);
      } else {
        setError(res.data.message || "Unable to fetch weather");
      }
    } catch (error) {
      console.error("Weather error:", error);

      setWeather(null);

      if (error.response) {
        setError(
          error.response.data?.message ||
            "Weather server returned an error"
        );
      } else {
        setError(
          "Unable to connect to Weather Server. Make sure backend is running."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="weather-page">

      <h1>🌦 Live Weather</h1>

      {/* =========================
          SEARCH
      ========================== */}

      <div className="search-box">

        <input
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchWeather();
            }
          }}
        />

        <button
          onClick={fetchWeather}
          disabled={loading}
        >
          {loading ? "Loading..." : "Search"}
        </button>

      </div>

      {/* =========================
          ERROR
      ========================== */}

      {error && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            background: "#fee2e2",
            color: "#b91c1c",
            borderRadius: "10px",
          }}
        >
          ❌ {error}
        </div>
      )}

      {/* =========================
          WEATHER
      ========================== */}

      {weather && (
        <>

          <div className="weather-card">

            <h2>📍 {weather.city}</h2>

            <h1>
              {weather.temperature}°C
            </h1>

            <p>
              🌤️ {weather.description}
            </p>

            <hr />

            <p>
              💧 Humidity : {weather.humidity}%
            </p>

            <p>
              🌬 Wind : {weather.wind} km/h
            </p>

            <p>
              ☁️ Weather : {weather.weather}
            </p>

          </div>


          {/* =========================
              RAINFALL SECTION
          ========================== */}

          <div
            style={{
              maxWidth: "600px",
              margin: "25px auto",
              padding: "25px",
              background: "#eef8ff",
              borderRadius: "20px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
            }}
          >

            <h2
              style={{
                textAlign: "center",
                color: "#087ea4",
                marginBottom: "25px",
              }}
            >
              🌧️ Rainfall Information
            </h2>


            {/* Current Rainfall */}

            <div
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "15px",
                textAlign: "center",
                marginBottom: "15px",
              }}
            >

              <div style={{ fontSize: "32px" }}>
                🌧️
              </div>

              <h3>
                Current Rainfall
              </h3>

              <div
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: "#087ea4",
                }}
              >
                {weather.rainfall ?? 0} mm/h
              </div>

            </div>


            {/* Rain Probability */}

            <div
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "15px",
                textAlign: "center",
                marginBottom: "15px",
              }}
            >

              <div style={{ fontSize: "32px" }}>
                ☔
              </div>

              <h3>
                Rain Probability
              </h3>

              <div
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: "#087ea4",
                }}
              >
                {weather.rainProbability ?? 0}%
              </div>

            </div>


            {/* Expected Rainfall */}

            <div
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "15px",
                textAlign: "center",
              }}
            >

              <div style={{ fontSize: "32px" }}>
                📊
              </div>

              <h3>
                Expected Rainfall
              </h3>

              <div
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: "#087ea4",
                }}
              >
                {weather.expectedRainfall ?? 0} mm
              </div>

              <p
                style={{
                  color: "#666",
                  marginTop: "8px",
                }}
              >
                Expected over the next 24 hours
              </p>

            </div>

          </div>

        </>
      )}

    </div>
  );
}

export default Weather;