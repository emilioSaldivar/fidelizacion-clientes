const express = require("express");
const router = express.Router();
const dashboard = require("../controllers/dashboard.controller.js");
const authenticateJWT = require('../middleware/authMiddleware.js');

// Obtener los KPIs del Dashboard
router.get("/kpis",authenticateJWT, dashboard.getDashboardMetrics);

module.exports = router;