// src/routes/deviceRoutes.js
const express = require("express");
const router = express.Router();
const deviceController = require("../controllers/deviceController");

router.post("/", deviceController.createDeviceData);
router.get("/", deviceController.getAllDeviceData);
router.get("/:imei", deviceController.getByImei);

module.exports = router;
