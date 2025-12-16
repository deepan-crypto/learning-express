const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true
  },
  waterFrequency: {
    type: String,
    required: true
  },
  sunlight: {
    type: String,
    required: true
  }
});

const Plant = mongoose.model("Plant", plantSchema);

module.exports = Plant;
