const express = require("express");
const router = express.Router();
const reglasAsignacionController = require("../controllers/reglas_asignacion.controller.js");

// Rutas para reglas de asignación
router.post("/reglas_asignacion", reglasAsignacionController.create); // Crear nueva regla
router.get("/reglas_asignacion", reglasAsignacionController.findAll); // Obtener todas las reglas
router.get("/reglas_asignacion/:id", reglasAsignacionController.findOne); // Obtener una regla por ID
router.put("/reglas_asignacion/:id", reglasAsignacionController.update); // Actualizar una regla por ID
router.delete("/reglas_asignacion/:id", reglasAsignacionController.delete); // Eliminar una regla por ID

module.exports = router;
