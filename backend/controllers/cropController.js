
const axios = require("axios");

const recommendCrop = async (req, res) => {
  try {
    console.log("Crop recommendation request:", req.body);

    const response = await axios.post(
      "http://127.0.0.1:5001/crop-recommend",
      req.body,
      {
        timeout: 20000,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    console.log("Crop AI response:", response.data);

    return res.status(200).json(response.data);

  } catch (error) {
    console.error(
      "Crop AI Error:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: "Crop Recommendation AI Server Error",
      details: error.response?.data || error.message
    });
  }
};

module.exports = { recommendCrop };
