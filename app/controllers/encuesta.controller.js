const db = require("../models");
const Pregunta = db.pregunta;
const Respuesta = db.respuesta;

exports.createRespuesta = async (req, res) => {
    try {
        const { cliente_id, pregunta_id, respuesta_texto } = req.body;

        if (!cliente_id || !pregunta_id || !respuesta_texto) {
            return res.status(400).json({ message: "Debe proporcionar cliente_id, pregunta_id y respuesta_texto." });
        }

        const nuevaRespuesta = await Respuesta.create({
            cliente_id,
            pregunta_id,
            respuesta_texto
        });

        res.status(201).json({ message: "Respuesta registrada con éxito", respuesta: nuevaRespuesta });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error al registrar la respuesta." });
    }
};


exports.createPregunta = async (req, res) => {
    try {
        const { pregunta_texto } = req.body;
        if (!pregunta_texto) {
            return res.status(400).json({ message: "La pregunta es obligatoria." });
        }

        const nuevaPregunta = await Pregunta.create({
            pregunta_texto
        });

        res.status(201).json({ message: "Pregunta creada con éxito", pregunta: nuevaPregunta });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error al crear la pregunta." });
    }
};

// Elimina pregunta por ID
exports.deletePregunta = async (req, res) => {
    try {
        const pregunta = await Pregunta.findByPk(req.params.id);
        if (!pregunta) {
            return res.status(404).json({ message: "Pregunta no encontrada." });
        }

        await pregunta.destroy();
        res.status(200).json({ message: "Pregunta eliminada con éxito." });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error al eliminar la pregunta." });
    }
};

// Obtener respuestas
exports.getRespuestas = async (req, res) => {
    try {
        const respuestas = await Respuesta.findAll({ where: { pregunta_id: req.params.id } });
        const pregunta = await Pregunta.findByPk(req.params.id);
        if (!respuestas) {
            return res.status(404).json({ message: "No hay respuestas asociadas a esta pregunta." });
        }
        res.status(200).json({pregunta: pregunta, respuestas: respuestas});
    } catch (error) {
        res.status(500).json({ message: error.message || "Error al obtener las respuestas." });
    }
};

// Obtener pregunta por ID  
exports.getPreguntaById = async (req, res) => {
    try {
        const pregunta = await Pregunta.findByPk(req.params.id);
        if (!pregunta) {
            return res.status(404).json({ message: "Pregunta no encontrada." });
        }
        res.status(200).json(pregunta);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error al obtener la pregunta." });
    }
};

// Actualizar pregunta por ID
exports.updatePregunta = async (req, res) => {
    try {
        const { pregunta_texto } = req.body;
        const pregunta = await Pregunta.findByPk(req.params.id);

        if (!pregunta) {
            return res.status(404).json({ message: "Pregunta no encontrada." });
        }

        pregunta.pregunta_texto = pregunta_texto;
        await pregunta.save();

        res.status(200).json({ message: "Pregunta actualizada con éxito.", pregunta });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error al actualizar la pregunta." });
    }
};

// Agregar respuesta a una pregunta por ID
exports.addRespuesta = async (req, res) => {
    try {
        const { cliente_id, respuesta_texto } = req.body;
        const pregunta = await Pregunta.findByPk(req.params.id);

        if (!pregunta) {
            return res.status(404).json({ message: "Pregunta no encontrada." });
        }

        const nuevaRespuesta = await Respuesta.create({
            cliente_id,
            pregunta_id: pregunta.id,
            respuesta_texto
        });

        res.status(201).json({ message: "Respuesta agregada con éxito.", respuesta: nuevaRespuesta });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error al agregar la respuesta." });
    }
};

// Eliminar respuesta por ID
exports.deleteRespuesta = async (req, res) => {
    try {
        const respuesta = await Respuesta.findByPk(req.params.id);
        if (!respuesta) {
            return res.status(404).json({ message: "Respuesta no encontrada." });
        }

        await respuesta.destroy();
        res.status(200).json({ message: "Respuesta eliminada con éxito." });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error al eliminar la respuesta." });
    }
};

// Obtener respuestas por cliente_id
exports.getRespuestasByCliente = async (req, res) => {
    try {
        const respuestas = await Respuesta.findAll({ where: { cliente_id: req.params.id } });
        if (!respuestas) {
            return res.status(404).json({ message: "No hay respuestas asociadas a este cliente." });
        }
        res.status(200).json(respuestas);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error al obtener las respuestas." });
    }
};

// Obtener preguntas por cliente_id
exports.getPreguntasByCliente = async (req, res) => {
    try {
        const preguntas = await Pregunta.findAll({ include: [{ model: Respuesta, where: { cliente_id: req.params.id } }] });
        if (!preguntas) {
            return res.status(404).json({ message: "No hay preguntas asociadas a este cliente." });
        }
        res.status(200).json(preguntas);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error al obtener las preguntas." });
    }
};

