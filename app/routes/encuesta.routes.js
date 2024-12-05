const express = require("express");
const router = express.Router();
const encuesta = require("../controllers/encuesta.controller.js");

    // Crear una nueva pregunta
    router.post("/pregunta", encuesta.createPregunta);

    // Obtener una pregunta por ID
    router.get("/pregunta/:id", encuesta.getPreguntaById);

    // Actualizar una pregunta por ID
    router.put("/pregunta/:id", encuesta.updatePregunta);

    // Eliminar una pregunta por ID
    router.delete("/pregunta/:id", encuesta.deletePregunta);

    // Obtener todas las respuestas asociadas a una pregunta por ID
    router.get("/respuestas/:id", encuesta.getRespuestas);

    // Agregar respuesta a una pregunta por ID
    router.post("/pregunta/:id/respuesta", encuesta.addRespuesta);

    // Eliminar una respuesta por ID
    router.delete("/respuesta/:id", encuesta.deleteRespuesta);

    // Obtener todas las respuestas de un cliente por cliente_id
    router.get("/respuestas/cliente/:id", encuesta.getRespuestasByCliente);

    // Obtener todas las preguntas respondidas por un cliente
    router.get("/preguntas/cliente/:id", encuesta.getPreguntasByCliente);

    module.exports = router;
