const express = require("express");

const router = express.Router();

/*
  FarmMitra Irrigation AI
  -----------------------
  Input:
    moisture = soil moisture percentage

  Output:
    prediction
*/

router.post("/", (req, res) => {
  try {
    const { moisture } = req.body;

    // Check input
    if (moisture === undefined || moisture === "") {
      return res.status(400).json({
        success: false,
        message: "Soil moisture is required",
      });
    }

    const moistureValue = Number(moisture);

    // Validate number
    if (
      Number.isNaN(moistureValue) ||
      moistureValue < 0 ||
      moistureValue > 100
    ) {
      return res.status(400).json({
        success: false,
        message: "Moisture must be a number between 0 and 100",
      });
    }

    let prediction;
    let recommendation;

    // FarmMitra irrigation logic
    if (moistureValue <= 30) {
      prediction = "Irrigation Required 💧";
      recommendation =
        "Soil moisture is low. Irrigation is recommended.";
    } else if (moistureValue <= 60) {
      prediction = "Moderate Moisture 🌱";
      recommendation =
        "Soil moisture is moderate. Monitor the field.";
    } else {
      prediction = "No Irrigation Required ✅";
      recommendation =
        "Soil moisture is sufficient. Irrigation is not required now.";
    }

    return res.json({
      success: true,
      moisture: moistureValue,
      prediction,
      recommendation,
    });
  } catch (error) {
    console.error("Irrigation error:", error);

    return res.status(500).json({
      success: false,
      message: "Irrigation prediction failed",
    });
  }
});

module.exports = router;