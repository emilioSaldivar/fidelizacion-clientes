const express = require("express");
const router = express.Router();
const vencimientoController = require("../controllers/vencimiento.controller.js");

// Definir las rutas
router.post("/vencimientos", vencimientoController.create);
router.get("/vencimientos", vencimientoController.findAll);
router.get("/vencimientos/:id", vencimientoController.findOne);
router.put("/vencimientos/:id", vencimientoController.update);
router.delete("/vencimientos/:id", vencimientoController.delete);

module.exports = router;