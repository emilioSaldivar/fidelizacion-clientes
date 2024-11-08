const db = require("../models");
const VencimientoPuntos = db.vencimiento_puntos;

// Crear un nuevo vencimiento
exports.create = async (req, res) => {
    try {
        const { fecha_inicio, fecha_fin, duracion_dias } = req.body;
        const nuevoVencimiento = await VencimientoPuntos.create({
            fecha_inicio,
            fecha_fin,
            duracion_dias,
        });
        res.status(201).json(nuevoVencimiento);
    } catch (error) {
        res.status(500).json({ message: "Error al crear vencimiento", error });
    }
};

// Obtener todos los vencimientos
exports.findAll = async (req, res) => {
    try {
        const vencimientos = await VencimientoPuntos.findAll();
        res.status(200).json(vencimientos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener vencimientos", error });
    }
};

// Obtener un vencimiento por ID
exports.findOne = async (req, res) => {
    try {
        const vencimiento = await VencimientoPuntos.findByPk(req.params.id);
        if (!vencimiento) {
            return res.status(404).json({ message: "Vencimiento no encontrado" });
        }
        res.status(200).json(vencimiento);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener vencimiento", error });
    }
};

// Actualizar un vencimiento por ID
exports.update = async (req, res) => {
    try {
        const { fecha_inicio, fecha_fin, duracion_dias } = req.body;
        const vencimiento = await VencimientoPuntos.findByPk(req.params.id);
        if (!vencimiento) {
            return res.status(404).json({ message: "Vencimiento no encontrado" });
        }
        await vencimiento.update({ fecha_inicio, fecha_fin, duracion_dias });
        res.status(200).json(vencimiento);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar vencimiento", error });
    }
};

// Eliminar un vencimiento por ID
exports.delete = async (req, res) => {
    try {
        const vencimiento = await VencimientoPuntos.findByPk(req.params.id);
        if (!vencimiento) {
            return res.status(404).json({ message: "Vencimiento no encontrado" });
        }
        await vencimiento.destroy();
        res.status(200).json({ message: "Vencimiento eliminado" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar vencimiento", error });
    }
};
