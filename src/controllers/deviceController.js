// src/controllers/deviceController.js
const Device = require("../models/Device");

// POST /api/devices
exports.createDeviceData = async (req, res) => {
  try {
    const { imei, temperature, status } = req.body;
    const newRecord = new Device({ imei, temperature, status });
    await newRecord.save();
    res.json({ ok: true, message: "Data stored successfully" });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
};

// GET /api/devices
exports.getAllDeviceData = async (req, res) => {
  try {
    const records = await Device.find().sort({ receivedAt: -1 }).limit(100).lean();
    res.json({ count: records.length, records });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
};

// GET /api/devices/:imei
exports.getByImei = async (req, res) => {
  try {
    const imei = req.params.imei;
    const records = await Device.find({ imei }).sort({ receivedAt: -1 }).limit(100).lean();
    res.json({ imei, count: records.length, records });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
};
