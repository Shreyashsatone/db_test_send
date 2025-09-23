const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  imei: { type: String, required: true },
  temperature: { type: Number, required: true },
  status: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Device", deviceSchema);
