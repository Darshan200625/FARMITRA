const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  addFarm,
  getFarms,
  deleteFarm,
  updateFarm,
} = require("../controllers/farmController");

// Add Farm with Image
router.post("/", upload.single("image"), addFarm);

// Get Farms
router.get("/", getFarms);

// Update Farm
router.put("/:id", upload.single("image"), updateFarm);

// Delete Farm
router.delete("/:id", deleteFarm);

module.exports = router;