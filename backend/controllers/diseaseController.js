const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const detectDisease = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image.",
      });
    }

    const form = new FormData();

    form.append(
      "image",
      fs.createReadStream(req.file.path)
    );

    const response = await axios.post(
      "http://127.0.0.1:5001/predict",
      form,
      {
        headers: form.getHeaders(),
        timeout: 60000,
      }
    );

    // Delete uploaded file after processing
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error("File delete error:", err);
      }
    });

    res.json(response.data);

  } catch (err) {
    console.error(
      "Disease AI Error:",
      err.response?.data || err.message
    );

    // Delete uploaded file if an error occurs
    if (req.file) {
      fs.unlink(req.file.path, () => {});
    }

    res.status(500).json({
      success: false,
      message: "Disease AI Server Error",
      error: err.response?.data || err.message,
    });
  }
};

module.exports = {
  detectDisease,
};