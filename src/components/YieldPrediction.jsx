import { useEffect, useState } from "react";
import axios from "axios";

function Weather() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Tumakuru");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:5000/api/weather?city=${city}`
      );

      setWeather(res.data.data);
    } catch (err) {
      console.log(err);
      alert("Unable to fetch weather");
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

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button onClick={fetchWeather}>
          Search
        </button>
      </div>

      {loading && <h3>Loading...</h3>}

      {weather && (

        <div className="weather-card">

          <h2>{weather.name}</h2>

          <h1>{weather.main.temp}°C</h1>

          <p>
            {weather.weather[0].description}
          </p>

          <hr />

          <p>💧 Humidity : {weather.main.humidity}%</p>

          <p>🌬 Wind : {weather.wind.speed} m/s</p>

          <p>
            🤗 Feels Like : {weather.main.feels_like}°C
          </p>

          <p>
            📈 Pressure : {weather.main.pressure} hPa
          </p>

        </div>

      )}

    </div>
  );
}

export default Weather;