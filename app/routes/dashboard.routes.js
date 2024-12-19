const express = require("express");
const router = express.Router();
const dashboard = require("../controllers/dashboard.controller.js");
<<<<<<< HEAD
const authenticateJWT = require('../middleware/authMiddleware.js');

// Obtener los KPIs del Dashboard
router.get("/kpis",authenticateJWT, dashboard.getDashboardMetrics);
=======

// Obtener los KPIs del Dashboard
router.get("/kpis", dashboard.getDashboardMetrics);
>>>>>>> d9cb542766cad15bf602b89e909a19c2b4e4d475

module.exports = router;