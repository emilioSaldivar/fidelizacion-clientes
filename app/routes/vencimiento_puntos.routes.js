const express = require("express");
const router = express.Router();
const vencimientosController = require("../controllers/vencimiento_puntos.controller");
const authenticateJWT = require('../middleware/authMiddleware.js');

// Crear un nuevo vencimiento
router.post("/vencimientos_puntos",authenticateJWT, vencimientosController.create);

// Obtener todos los vencimientos
router.get("/vencimientos_puntos",authenticateJWT, vencimientosController.findAll);

// Obtener un vencimiento por ID
router.get("/vencimientos_puntos/:id",authenticateJWT, vencimientosController.findOne);

// Actualizar un vencimiento por ID
router.put("/vencimientos_puntos/:id",authenticateJWT, vencimientosController.update);

// Eliminar un vencimiento por ID
router.delete("/vencimientos_puntos/:id",authenticateJWT, vencimientosController.delete);

module.exports = router;
