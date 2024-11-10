// controllers/cliente.controller.js
const db = require("../models");
const Cliente = db.Cliente;

// Crear un nuevo cliente
exports.createCliente = async (req, res) => {
    try {
        const { nombre, apellido, numero_documento, tipo_documento, nacionalidad, email, telefono, fecha_nacimiento } = req.body;

        // Validación básica de campos obligatorios
        if (!nombre || !apellido || !numero_documento || !email) {
            return res.status(400).json({ message: "Nombre, apellido, número de documento y email son requeridos." });
        }

        // Crear el cliente en la base de datos
        const cliente = await Cliente.create({
            nombre,
            apellido,
            numero_documento,
            tipo_documento,
            nacionalidad,
            email,
            telefono,
            fecha_nacimiento
        });

        res.status(201).json(cliente);
    } catch (error) {
        console.error("Error al crear cliente:", error);
        res.status(500).json({ message: "Error al crear el cliente", error });
    }
};

// Obtener todos los clientes
exports.getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.status(200).json(clientes);
    } catch (error) {
        console.error("Error al obtener clientes:", error);
        res.status(500).json({ message: "Error al obtener los clientes", error });
    }
};

// Obtener un cliente por ID
exports.getClienteById = async (req, res) => {
    try {
        const { id } = req.params;
        const cliente = await Cliente.findByPk(id);

        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        res.status(200).json(cliente);
    } catch (error) {
        console.error("Error al obtener cliente:", error);
        res.status(500).json({ message: "Error al obtener el cliente", error });
    }
};

// Actualizar un cliente por ID
exports.updateCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, numero_documento, tipo_documento, nacionalidad, email, telefono, fecha_nacimiento } = req.body;

        const [updatedRows] = await Cliente.update(
            { nombre, apellido, numero_documento, tipo_documento, nacionalidad, email, telefono, fecha_nacimiento },
            { where: { id } }
        );

        if (updatedRows === 0) {
            return res.status(404).json({ message: "Cliente no encontrado o no actualizado" });
        }

        res.status(200).json({ message: "Cliente actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar cliente:", error);
        res.status(500).json({ message: "Error al actualizar el cliente", error });
    }
};

// Eliminar un cliente por ID
exports.deleteCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRows = await Cliente.destroy({ where: { id } });

        if (deletedRows === 0) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        res.status(200).json({ message: "Cliente eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar cliente:", error);
        res.status(500).json({ message: "Error al eliminar el cliente", error });
    }
};
