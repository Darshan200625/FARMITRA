const axios = require("axios");

const getWeather = async (req, res) => {
  try {
    const city = req.params.city;

    // ==========================================
    // 1. CURRENT WEATHER
    // ==========================================

    const currentResponse = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: city,
          appid: process.env.WEATHER_API_KEY,
          units: "metric",
        },
      }
    );

    const current = currentResponse.data;

    // ==========================================
    // 2. 5-DAY / 3-HOUR FORECAST
    // ==========================================

    const forecastResponse = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast",
      {
        params: {
          lat: current.coord.lat,
          lon: current.coord.lon,
          appid: process.env.WEATHER_API_KEY,
          units: "metric",
        },
      }
    );

    const forecast = forecastResponse.data;

    // ==========================================
    // CURRENT RAINFALL
    // ==========================================

    const currentRainfall =
      current.rain?.["1h"] ||
      (current.rain?.["3h"]
        ? current.rain["3h"] / 3
        : 0);

    // ==========================================
    // RAIN PROBABILITY
    // Find the highest probability in the
    // upcoming forecast periods
    // ==========================================

    const probabilities = forecast.list
      .slice(0, 8)
      .map((item) => (item.pop || 0) * 100);

    const rainProbability =
      probabilities.length > 0
        ? Math.round(Math.max(...probabilities))
        : 0;

    // ==========================================
    // EXPECTED RAINFALL
    // Sum rainfall from the next 24 hours
    // ==========================================

    const next24Hours = forecast.list.slice(0, 8);

    let expectedRainfall = 0;

    next24Hours.forEach((item) => {
      if (item.rain?.["3h"]) {
        expectedRainfall += item.rain["3h"];
      }
    });

    // ==========================================
    // RESPONSE
    // ==========================================

    res.json({
      success: true,

      // Weather
      city: current.name,
      temperature: current.main.temp,
      humidity: current.main.humidity,
      weather: current.weather[0].main,
      description: current.weather[0].description,
      wind: Number((current.wind.speed * 3.6).toFixed(2)),

      // Rainfall
      rainfall: Number(currentRainfall.toFixed(2)),
      rainProbability: rainProbability,
      expectedRainfall: Number(expectedRainfall.toFixed(2)),
    });

  } catch (error) {

    console.error(
      "Weather API Error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      message: "Unable to fetch weather",
      error: error.response?.data || error.message,
    });
  }
};

module.exports = {
  getWeather,
};