const db = require('../models');
const Vencimiento = db.Vencimiento;

// Crear un nuevo vencimiento
exports.create = async (req, res) => {
    try {
        const { fecha_inicio, fecha_fin } = req.body;
        
        // Calcular duracion_dias a partir de la diferencia entre fecha_fin y fecha_inicio
        const duracion_dias = Math.ceil((new Date(fecha_fin) - new Date(fecha_inicio)) / (1000 * 60 * 60 * 24));
        
        // Crear el vencimiento con la duración calculada
        const vencimiento = await Vencimiento.create({ fecha_inicio, fecha_fin, duracion_dias });
        res.status(201).json(vencimiento);
    } catch (error) {
        res.status(500).json({ message: "Error al crear vencimiento", error });
    }
};

// Obtener todos los vencimientos
exports.findAll = async (req, res) => {
    try {
        const vencimientos = await Vencimiento.findAll();
        res.status(200).json(vencimientos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un vencimiento por ID
exports.findOne = async (req, res) => {
    try {
        const vencimiento = await Vencimiento.findByPk(req.params.id);
        if (vencimiento) {
            res.status(200).json(vencimiento);
        } else {
            res.status(404).json({ message: 'Vencimiento no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un vencimiento por ID
exports.update = async (req, res) => {
    try {
        const { fecha_inicio, fecha_fin } = req.body;
        
        // Calcular duracion_dias a partir de la diferencia entre fecha_fin y fecha_inicio
        const duracion_dias = Math.ceil((new Date(fecha_fin) - new Date(fecha_inicio)) / (1000 * 60 * 60 * 24));
        
        // Actualizar el vencimiento con la duración calculada
        const num = await Vencimiento.update(
            { fecha_inicio, fecha_fin, duracion_dias },
            {
                where: { id: req.params.id }
            }
        );
        if (num == 1) {
            res.status(200).json({ message: 'Vencimiento actualizado exitosamente' });
        } else {
            res.status(404).json({ message: 'Vencimiento no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un vencimiento por ID
exports.delete = async (req, res) => {
    try {
        const num = await Vencimiento.destroy({
            where: { id: req.params.id }
        });
        if (num == 1) {
            res.status(200).json({ message: 'Vencimiento eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Vencimiento no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};