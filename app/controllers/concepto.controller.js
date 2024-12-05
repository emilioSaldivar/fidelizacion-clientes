// controllers/concepto.controller.js
const db = require("../models");
const Concepto = db.Concepto;

// Crear un nuevo concepto
exports.createConcepto = async (req, res) => {
    try {
        const { descripcion, puntos_requeridos, nivel } = req.body;
        const concepto = await Concepto.create({ descripcion, puntos_requeridos, nivel });
        res.status(201).json(concepto);
    } catch (error) {
        res.status(500).json({ message: "Error al crear concepto", error });
    }
};

// Obtener todos los conceptos
exports.getConceptos = async (req, res) => {
    try {
        const conceptos = await Concepto.findAll();
        res.status(200).json(conceptos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener conceptos", error });
    }
};

// Actualizar un concepto
exports.updateConcepto = async (req, res) => {
    try {
        const { id } = req.params;
        const { descripcion, puntos_requeridos, nivel } = req.body;
        const concepto = await Concepto.update({ descripcion, puntos_requeridos, nivel }, {
            where: { id }
        });
        res.status(200).json({ message: "Concepto actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar concepto", error });
    }
};

// Eliminar un concepto
exports.deleteConcepto = async (req, res) => {
    try {
        const { id } = req.params;
        await Concepto.destroy({
            where: { id }
        });
        res.status(200).json({ message: "Concepto eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar concepto", error });
    }
};
