const Farm = require("../models/Farm");

// ===================== ADD FARM =====================

const addFarm = async (req, res) => {
  try {
    const { farmName, crop, area, location, status } = req.body;

    const farm = await Farm.create({
      farmName,
      crop,
      area,
      location,
      status: status || "Healthy",
      image: req.file ? req.file.filename : "",
    });

    res.status(201).json({
      success: true,
      message: "Farm Added Successfully",
      farm,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===================== GET ALL FARMS =====================

const getFarms = async (req, res) => {
  try {
    const farms = await Farm.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      farms,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===================== UPDATE FARM =====================

const updateFarm = async (req, res) => {
  try {

    const updateData = {
      farmName: req.body.farmName,
      crop: req.body.crop,
      area: req.body.area,
      location: req.body.location,
      status: req.body.status || "Healthy",
    };

    // Update image only if a new one is uploaded
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const farm = await Farm.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    if (!farm) {
      return res.status(404).json({
        success: false,
        message: "Farm not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Farm Updated Successfully",
      farm,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ===================== DELETE FARM =====================

const deleteFarm = async (req, res) => {
  try {

    const farm = await Farm.findByIdAndDelete(req.params.id);

    if (!farm) {
      return res.status(404).json({
        success: false,
        message: "Farm not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Farm Deleted Successfully",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  addFarm,
  getFarms,
  updateFarm,
  deleteFarm,
};