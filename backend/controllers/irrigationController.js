const axios = require("axios");

const predictIrrigation = async (req, res) => {
  try {
    const response = await axios.post("http://127.0.0.1:5001/irrigation", req.body);

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "AI Server Error",
    });
  }
};

module.exports = {
  predictIrrigation,
};