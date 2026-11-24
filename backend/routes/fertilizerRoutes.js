const express = require("express");

const router = express.Router();

const {
  recommendFertilizer,
} = require("../controllers/fertilizerController");

router.post("/", recommendFertilizer);

module.exports = router;