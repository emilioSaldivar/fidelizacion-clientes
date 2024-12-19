const express = require("express");
const router = express.Router();
const encuesta = require("../controllers/encuesta.controller.js");
<<<<<<< HEAD
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
=======

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
>>>>>>> d9cb542766cad15bf602b89e909a19c2b4e4d475

    module.exports = router;
