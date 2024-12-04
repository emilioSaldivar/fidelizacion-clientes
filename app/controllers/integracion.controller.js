const db = require('../models');
const Cliente = db.cliente; // Modelo Cliente
//const UsoPuntos = db.uso_puntos; // Relación definida en el modelo Cliente
const BolsaPuntos = db.bolsa_puntos; // Modelo BolsaPuntos

// Obtener todos los clientes
exports.obtenerClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll();

        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los clientes", error });
    }
};

// Obtener un cliente por su número de documento
exports.obtenerClientePorNumeroDocumento = async (req, res) => {
    const { numero_documento } = req.params;
    try {
        const cliente = await Cliente.findOne({
            where: { numero_documento },
        });

        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        res.status(200).json(cliente);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el cliente", error });
    }
};

// Consultar el saldo total de puntos de un cliente por su número de documento
exports.consultarSaldoPuntos = async (req, res) => {
    const { numero_documento } = req.params;

    try {
        // Buscar el cliente por su número de documento
        const cliente = await Cliente.findOne({
            where: { numero_documento },
        });

        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        // Sumar el saldo de puntos de todas las bolsas asociadas al cliente
        const saldoTotal = await BolsaPuntos.sum('saldo_puntos', {
            where: { cliente_id: cliente.id },
        });

        res.status(200).json({
            numero_documento,
            saldo_puntos: saldoTotal || 0, // Devuelve 0 si no hay bolsas asociadas
        });
    } catch (error) {
        res.status(500).json({ message: "Error al consultar el saldo de puntos", error });
    }
};






