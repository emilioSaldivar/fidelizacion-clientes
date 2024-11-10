const express = require("express");
const router = express.Router();
const usoPuntosController = require("../controllers/uso_puntos.controller");

router.post("/uso-puntos", usoPuntosController.usarPuntos);


module.exports = router;