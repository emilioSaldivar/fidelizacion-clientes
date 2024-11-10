const db = require("../models");
require('dotenv').config();
const UsoPunto = db.uso_puntos;
const Conceptos = db.Concepto;
const Cliente = db.cliente; 
const { Op } = db.Sequelize;
const { Pool } = require('pg');

// Configurar la conexión a PostgreSQL
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});
exports.getUsoPuntos = async (req, res) => {
    const { conceptoId, fechaUso, clienteId } = req.query;

    try {
        // Construir la consulta SQL
        const query = `
            SELECT 
                uso_puntos.id,
                uso_puntos.puntaje_utilizado,
                uso_puntos.fecha,
                conceptos.descripcion AS concepto_descripcion,
                clientes.nombre AS cliente_nombre,
                clientes.apellido AS cliente_apellido
            FROM 
                public.uso_puntos
            JOIN 
                public.conceptos ON uso_puntos.concepto_id = conceptos.id
            JOIN 
                public.clientes ON uso_puntos.cliente_id = clientes.id
            WHERE 
                ($1::integer IS NULL OR conceptos.id = $1) AND
                ($2::date IS NULL OR uso_puntos.fecha = $2) AND
                ($3::integer IS NULL OR clientes.id = $3)
            ORDER BY 
                uso_puntos.fecha DESC;
        `;

        // Ejecutar la consulta
        const result = await pool.query(query, [conceptoId || null, fechaUso || null, clienteId || null]);

        // Enviar los resultados como respuesta
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener el reporte de uso de puntos:', error);
        res.status(500).json({ message: 'Error al obtener el reporte de uso de puntos' });
    }

};

// Función para obtener el reporte de bolsa de puntos por cliente y rango de puntos
exports.getBolsaPuntos = async (req, res) => {
    const { clienteId, minPuntos, maxPuntos } = req.query;

    try {
        // Construir la consulta SQL
        const query = `
            SELECT 
                bolsa_puntos.id,
                bolsa_puntos.puntaje_asignado,
                bolsa_puntos.puntaje_utilizado,
                bolsa_puntos.saldo_puntos,
                bolsa_puntos.fecha_asignacion,
                bolsa_puntos.fecha_caducidad,
                clientes.nombre AS cliente_nombre,
                clientes.apellido AS cliente_apellido
            FROM 
                public.bolsa_puntos
            JOIN 
                public.clientes ON bolsa_puntos.cliente_id = clientes.id
            WHERE 
                ($1::integer IS NULL OR clientes.id = $1) AND
                ($2::integer IS NULL OR bolsa_puntos.saldo_puntos >= $2) AND
                ($3::integer IS NULL OR bolsa_puntos.saldo_puntos <= $3)
            ORDER BY 
                bolsa_puntos.fecha_asignacion DESC;
        `;

        // Ejecutar la consulta
        const result = await pool.query(query, [
            clienteId || null, 
            minPuntos || null, 
            maxPuntos || null
        ]);

        // Enviar los resultados como respuesta
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener el reporte de bolsa de puntos:', error);
        res.status(500).json({ message: 'Error al obtener el reporte de bolsa de puntos' });
    }
};

// Función para obtener el reporte de clientes con puntos a vencer en X días
exports.getPuntosPorVencer = async (req, res) => {
    const { dias } = req.query;

    try {
        // Construir la consulta SQL
        const query = `
            SELECT 
                bolsa_puntos.id,
                bolsa_puntos.saldo_puntos,
                bolsa_puntos.fecha_caducidad,
                clientes.nombre AS cliente_nombre,
                clientes.apellido AS cliente_apellido,
                clientes.numero_documento AS cliente_documento
            FROM 
                public.bolsa_puntos
            JOIN 
                public.clientes ON bolsa_puntos.cliente_id = clientes.id
            WHERE 
                bolsa_puntos.saldo_puntos > 0 AND
                bolsa_puntos.fecha_caducidad <= CURRENT_DATE + $1::integer
            ORDER BY 
                bolsa_puntos.fecha_caducidad ASC;
        `;

        // Ejecutar la consulta
        const result = await pool.query(query, [dias || 0]);

        // Enviar los resultados como respuesta
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener el reporte de puntos por vencer:', error);
        res.status(500).json({ message: 'Error al obtener el reporte de puntos por vencer' });
    }
};


// Función para obtener clientes filtrados por nombre, apellido y cumpleaños
exports.buscarClientes = async  (req, res) => {
    const { nombre, apellido, fechaNacimiento } = req.query;

    try {
        // Construir la consulta SQL
        const query = `
            SELECT 
                id,
                nombre,
                apellido,
                numero_documento,
                tipo_documento,
                nacionalidad,
                email,
                telefono,
                fecha_nacimiento
            FROM 
                public.clientes
            WHERE 
                ($1::varchar IS NULL OR nombre ILIKE '%' || $1 || '%') AND
                ($2::varchar IS NULL OR apellido ILIKE '%' || $2 || '%') AND
                ($3::date IS NULL OR fecha_nacimiento = $3)
            ORDER BY 
                nombre ASC, apellido ASC;
        `;

        // Ejecutar la consulta
        const result = await pool.query(query, [nombre || null, apellido || null, fechaNacimiento || null]);

        // Enviar los resultados como respuesta
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener clientes:', error);
        res.status(500).json({ message: 'Error al obtener clientes' });
    }
};

// Función para calcular el equivalente en puntos de un monto dado
exports.calcularPuntos = async (req, res) => {
    const { monto } = req.query;

    if (!monto) {
        return res.status(400).json({ message: "El parámetro 'monto' es requerido." });
    }

    try {
        // Consulta para obtener la regla de asignación según el monto
        const query = `
            SELECT 
                equivalencia_puntos
            FROM 
                public.reglas_asignacion
            WHERE 
                limite_inferior <= $1 AND limite_superior >= $1
            LIMIT 1;
        `;

        // Ejecutar la consulta
        const result = await pool.query(query, [monto]);

        // Verificar si se encontró una regla de asignación
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "No se encontró una regla de asignación de puntos para este monto." });
        }

        const equivalenciaPuntos = result.rows[0].equivalencia_puntos;

        // Calcular los puntos equivalentes
        const puntos_equivalentes = Math.floor(monto / equivalenciaPuntos);

        // Responder con el monto y los puntos equivalentes
        res.json({
            monto,
            puntos_equivalentes
        });
    } catch (error) {
        console.error('Error al calcular puntos equivalentes:', error);
        res.status(500).json({ message: 'Error al calcular puntos equivalentes' });
    }
};