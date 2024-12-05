const express = require("express");
const router = express.Router();
const usoPuntosController = require("../controllers/uso_puntos.controller");
const authenticateJWT = require('../middleware/authMiddleware.js');

router.post("/uso-puntos",authenticateJWT, usoPuntosController.usarPuntos);


module.exports = router;