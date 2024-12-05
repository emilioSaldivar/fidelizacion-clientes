const express = require("express");
const router = express.Router();
const dashboard = require("../controllers/dashboard.controller.js");

// Obtener los KPIs del Dashboard
router.get("/kpis", dashboard.getDashboardMetrics);

module.exports = router;