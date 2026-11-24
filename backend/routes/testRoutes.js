const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AgriTwin AI Backend Connected Successfully 🚀",
    server: "Running",
  });
});

module.exports = router;