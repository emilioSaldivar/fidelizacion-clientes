const express = require("express");
const router = express.Router();
const vencimientosController = require("../controllers/vencimiento_puntos.controller");

// Crear un nuevo vencimiento
router.post("/vencimientos_puntos", vencimientosController.create);

// Obtener todos los vencimientos
router.get("/vencimientos_puntos", vencimientosController.findAll);

// Obtener un vencimiento por ID
router.get("/vencimientos_puntos/:id", vencimientosController.findOne);

// Actualizar un vencimiento por ID
router.put("/vencimientos_puntos/:id", vencimientosController.update);

// Eliminar un vencimiento por ID
router.delete("/vencimientos_puntos/:id", vencimientosController.delete);

module.exports = router;
