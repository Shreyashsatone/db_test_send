require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Device = require('./src/models/Device'); // must match file path exactly


const app = express();
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Routes

// Home
app.get("/", (req, res) => {
  res.send("EC200U IoT API is running 🚀");
});

// Add new device data
app.post("/api/devices", async (req, res) => {
  try {
    const { imei, temperature, status } = req.body;
    if (!imei || !temperature || !status) {
      return res.status(400).json({ error: "imei, temperature, and status are required" });
    }
    const device = new Device({ imei, temperature, status });
    await device.save();
    res.status(201).json(device);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get all device data
app.get("/api/devices", async (req, res) => {
  try {
    const devices = await Device.find().sort({ timestamp: -1 });
    res.json(devices);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get device data by IMEI
app.get("/api/devices/:imei", async (req, res) => {
  try {
    const devices = await Device.find({ imei: req.params.imei }).sort({ timestamp: -1 });
    if (devices.length === 0) return res.status(404).json({ error: "No data found for this IMEI" });
    res.json(devices);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
