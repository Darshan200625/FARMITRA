const recommendFertilizer = async (req, res) => {
  try {
    const {
      crop,
      nitrogen,
      phosphorus,
      potassium,
      ph,
      soilCondition,
    } = req.body;

    if (
      crop === undefined ||
      nitrogen === undefined ||
      phosphorus === undefined ||
      potassium === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Crop and N/P/K values are required",
      });
    }

    const N = Number(nitrogen);
    const P = Number(phosphorus);
    const K = Number(potassium);
    const soilPH = Number(ph || 7);
    const condition = Number(soilCondition || 50);

    const recommendations = [];

    // -----------------------------
    // Nitrogen recommendation
    // -----------------------------
    if (N < 35) {
      recommendations.push({
        nutrient: "Nitrogen",
        fertilizer: "Urea",
        reason: "Nitrogen level is low",
        recommendation: "Apply nitrogen-rich fertilizer in split doses",
      });
    } else if (N < 60) {
      recommendations.push({
        nutrient: "Nitrogen",
        fertilizer: "Urea / Organic Manure",
        reason: "Nitrogen level is moderate",
        recommendation: "Use a moderate nitrogen application",
      });
    } else {
      recommendations.push({
        nutrient: "Nitrogen",
        fertilizer: "Avoid excess nitrogen",
        reason: "Nitrogen level is already high",
        recommendation: "Do not apply additional nitrogen unless required",
      });
    }

    // -----------------------------
    // Phosphorus recommendation
    // -----------------------------
    if (P < 35) {
      recommendations.push({
        nutrient: "Phosphorus",
        fertilizer: "DAP / SSP",
        reason: "Phosphorus level is low",
        recommendation: "Use phosphorus fertilizer according to soil test",
      });
    } else if (P < 60) {
      recommendations.push({
        nutrient: "Phosphorus",
        fertilizer: "DAP / SSP",
        reason: "Phosphorus level is moderate",
        recommendation: "Apply a moderate amount if required",
      });
    } else {
      recommendations.push({
        nutrient: "Phosphorus",
        fertilizer: "No additional phosphorus",
        reason: "Phosphorus level is high",
        recommendation: "Avoid unnecessary phosphorus application",
      });
    }

    // -----------------------------
    // Potassium recommendation
    // -----------------------------
    if (K < 35) {
      recommendations.push({
        nutrient: "Potassium",
        fertilizer: "MOP (Potash)",
        reason: "Potassium level is low",
        recommendation: "Apply potassium fertilizer according to crop requirement",
      });
    } else if (K < 60) {
      recommendations.push({
        nutrient: "Potassium",
        fertilizer: "MOP / Organic Manure",
        reason: "Potassium level is moderate",
        recommendation: "Use moderate potassium supplementation if required",
      });
    } else {
      recommendations.push({
        nutrient: "Potassium",
        fertilizer: "No additional potassium",
        reason: "Potassium level is high",
        recommendation: "Avoid unnecessary potassium application",
      });
    }

    // -----------------------------
    // pH recommendation
    // -----------------------------
    let phRecommendation;

    if (soilPH < 5.5) {
      phRecommendation = {
        status: "Acidic soil",
        recommendation:
          "Consider agricultural lime based on a proper soil test",
      };
    } else if (soilPH > 8) {
      phRecommendation = {
        status: "Alkaline soil",
        recommendation:
          "Consider organic matter and suitable soil amendments based on a soil test",
      };
    } else {
      phRecommendation = {
        status: "Suitable pH",
        recommendation: "Soil pH is generally suitable for many crops",
      };
    }

    // -----------------------------
    // Soil condition
    // -----------------------------
    let soilRecommendation;

    if (condition < 40) {
      soilRecommendation =
        "Improve soil health with organic manure, compost and proper nutrient management.";
    } else if (condition < 70) {
      soilRecommendation =
        "Maintain soil fertility with balanced fertilizer and organic matter.";
    } else {
      soilRecommendation =
        "Soil condition is good. Maintain balanced nutrient management.";
    }

    res.json({
      success: true,

      crop,

      soil: {
        nitrogen: N,
        phosphorus: P,
        potassium: K,
        ph: soilPH,
        condition,
      },

      recommendations,

      phRecommendation,

      soilRecommendation,

      message:
        "Fertilizer recommendation generated successfully",
    });
  } catch (error) {
    console.error("Fertilizer Recommendation Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to generate fertilizer recommendation",
    });
  }
};

module.exports = {
  recommendFertilizer,
};