const db = require("../models");
const ReglaAsignacion = db.reglas_asignacion;

// Crear una nueva regla de asignación
exports.create = async (req, res) => {
    try {
        const { limite_inferior, limite_superior, equivalencia_puntos } = req.body;
        const regla = await ReglaAsignacion.create({ limite_inferior, limite_superior, equivalencia_puntos });
        res.status(200).json({ message: "Se creó regla de asignación",regla});
    } catch (error) {
        res.status(500).json({ message: "Error al crear regla de asignación", error });
    }
};

// Obtener todas las reglas de asignación
exports.findAll = async (req, res) => {
    try {
        const reglas = await ReglaAsignacion.findAll();
        res.status(200).json(reglas);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener reglas de asignación", error });
    }
};

// Obtener una regla de asignación por ID
exports.findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const regla = await ReglaAsignacion.findByPk(id);
        if (regla) {
            res.status(200).json(regla);
        } else {
            res.status(404).json({ message: "Regla de asignación no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la regla de asignación", error });
    }
};

// Actualizar una regla de asignación
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { limite_inferior, limite_superior, equivalencia_puntos } = req.body;
        const [updated] = await ReglaAsignacion.update(
            { limite_inferior, limite_superior, equivalencia_puntos },
            { where: { id } }
        );
        if (updated) {
            const updatedRegla = await ReglaAsignacion.findByPk(id);
            res.status(200).json(updatedRegla);
        } else {
            res.status(404).json({ message: "Regla de asignación no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la regla de asignación", error });
    }
};

// Eliminar una regla de asignación
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await ReglaAsignacion.destroy({ where: { id } });
        if (deleted) {
            res.status(200).json({ message: `Regla ${id} de asignación eliminada correctamente` });
        } else {
            res.status(404).json({ message: "Regla de asignación no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la regla de asignación", error });
    }
};
