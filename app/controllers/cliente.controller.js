const db = require("../models");
const Cliente = db.cliente;
const Referido = db.referidos;
// Crear un nuevo cliente
exports.createCliente = async (req, res) => {
    try {
        const {
            nombre,
            apellido,
            numero_documento,
            tipo_documento,
            nacionalidad,
            email,
            telefono,
            fecha_nacimiento,
            referidor_id
        } = req.body;

        // Validar que los datos obligatorios estén presentes
        if (!nombre || !apellido || !numero_documento || !tipo_documento || !nacionalidad || !email || !telefono || !fecha_nacimiento) {
            return res.status(400).json({ message: "Faltan campos obligatorios para crear el cliente." });
        }
        
        // Validar que el referidor exista si se proporciona
        if (referidor_id) {
            const referidor = await Cliente.findByPk(referidor_id);
            if (!referidor) {
                return res.status(400).json({ message: "El cliente referidor no existe." });
            }
        }

        // Crear el cliente
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

        // Si se proporciona un referidor_id, crear la relación en Referidos
        if (referidor_id) {
            await Referido.create({
                referidor_id,  // ID del cliente referidor
                referido_id: cliente.id,  // ID del cliente recién creado
                primera_compra_realizada: false // Inicialmente en false
            });
        }

        // Responder con el cliente creado y mensaje de éxito
        res.status(201).json({
            message: "Cliente creado exitosamente.",
            cliente: cliente
        });

    } catch (error) {
        console.error("Error al crear cliente:", error);
        res.status(500).json({ message: "Ocurrió un error al crear el cliente." });
    }
};

// Obtener todos los clientes
exports.getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener clientes", error });
    }
};
// Obtener cliente por id del cliente
exports.getClienteById = async (req, res) => {
    try {
        const { id } = req.params;
        const cliente = await Cliente.findByPk(id);
        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        res.status(200).json(cliente);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener cliente", error });
    }
};

// Actualizar un cliente
exports.updateCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            nombre,
            apellido,
            numero_documento,
            tipo_documento,
            nacionalidad,
            email,
            telefono,
            fecha_nacimiento
        } = req.body;

        await Cliente.update({
            nombre,
            apellido,
            numero_documento,
            tipo_documento,
            nacionalidad,
            email,
            telefono,
            fecha_nacimiento
        }, {
            where: { id }
        });

        res.status(200).json({ message: "Cliente actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar cliente", error });
    }
};

// Eliminar un cliente
exports.deleteCliente = async (req, res) => {
    try {
        const { id } = req.params;

        await Cliente.destroy({
            where: { id }
        });

        res.status(200).json({ message: "Cliente eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar cliente", error });
    }
};
