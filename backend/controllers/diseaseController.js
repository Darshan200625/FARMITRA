
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

    const diseaseAIUrl = process.env.DISEASE_AI_URL;

    if (!diseaseAIUrl) {
      return res.status(500).json({
        success: false,
        message: "Disease AI server URL is not configured.",
      });
    }

    const form = new FormData();

    form.append("image", fs.createReadStream(req.file.path));

    const response = await axios.post(
      `${diseaseAIUrl.replace(/\/$/, "")}/predict`,
      form,
      {
        headers: form.getHeaders(),
        timeout: 120000,
        maxBodyLength: Infinity,
      }
    );

    return res.json(response.data);

  } catch (err) {
    console.error(
      "Disease AI Error:",
      err.response?.data || err.message
    );

    return res.status(500).json({
      success: false,
      message: "Disease AI Server Error",
      error: err.response?.data || err.message,
    });

  } finally {
    if (req.file?.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error("File delete error:", err.message);
        }
      });
    }
  }
};

module.exports = {
  detectDisease,
};
