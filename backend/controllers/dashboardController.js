const Farm = require("../models/Farm");

const getDashboard = async (req, res) => {
  try {

    const farms = await Farm.find();

    const totalFarms = farms.length;

    const totalArea = farms.reduce(
      (sum, farm) => sum + Number(farm.area),
      0
    );

    const totalCrops = new Set(
      farms.map((farm) => farm.crop)
    ).size;

    const healthy = farms.filter(
      (farm) => farm.status === "Healthy"
    ).length;

    res.json({
      success: true,
      totalFarms,
      totalArea,
      totalCrops,
      healthy,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getDashboard,
};