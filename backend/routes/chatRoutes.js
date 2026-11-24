
const express = require("express");
const router = express.Router();

const { chatWithAI } = require("../controllers/chatController");

router.post("/", (req, res, next) => {
  console.log("FARMITRA CHAT ROUTE HIT");
  next();
}, chatWithAI);

module.exports = router;
