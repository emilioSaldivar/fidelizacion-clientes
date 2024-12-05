const express = require("express");
const router = express.Router();
const encuesta = require("../controllers/encuesta.controller.js");
const authenticateJWT = require('../middleware/authMiddleware.js');
    // Crear una nueva pregunta
    router.post("/pregunta",authenticateJWT, encuesta.createPregunta);

    // Obtener una pregunta por ID
    router.get("/pregunta/:id",authenticateJWT, encuesta.getPreguntaById);

    // Actualizar una pregunta por ID
    router.put("/pregunta/:id",authenticateJWT, encuesta.updatePregunta);

    // Eliminar una pregunta por ID
    router.delete("/pregunta/:id",authenticateJWT, encuesta.deletePregunta);

    // Obtener todas las respuestas asociadas a una pregunta por ID
    router.get("/respuestas/:id",authenticateJWT, encuesta.getRespuestas);

    // Agregar respuesta a una pregunta por ID
    router.post("/pregunta/:id/respuesta",authenticateJWT, encuesta.addRespuesta);

    // Eliminar una respuesta por ID
    router.delete("/respuesta/:id",authenticateJWT, encuesta.deleteRespuesta);

    // Obtener todas las respuestas de un cliente por cliente_id
    router.get("/respuestas/cliente/:id",authenticateJWT, encuesta.getRespuestasByCliente);

    // Obtener todas las preguntas respondidas por un cliente
    router.get("/preguntas/cliente/:id",authenticateJWT, encuesta.getPreguntasByCliente);

    module.exports = router;
