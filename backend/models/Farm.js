const mongoose = require("mongoose");

const farmSchema = new mongoose.Schema(
  {
    farmName: {
      type: String,
      required: true,
    },

    crop: {
      type: String,
      required: true,
    },

    area: {
      type: Number,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "Healthy",
    },
    image: {
  type: String,
  default: "",
},

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Farm", farmSchema);