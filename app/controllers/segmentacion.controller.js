const { Pool } = require('pg');
require('dotenv').config();

// Configurar la conexión a PostgreSQL
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

exports.segmentarClientes = async (req, res) => {
    const { edad_min, edad_max, nacionalidad } = req.query;

    try {
        // Construir la consulta SQL
        const query = `
            SELECT 
                c.id,
                c.nombre,
                c.apellido,
                c.nacionalidad,
                EXTRACT(YEAR FROM AGE(CURRENT_DATE, c.fecha_nacimiento)) AS edad
            FROM 
                public.clientes c
            WHERE 
                ($1::integer IS NULL OR EXTRACT(YEAR FROM AGE(CURRENT_DATE, c.fecha_nacimiento)) >= $1) AND
                ($2::integer IS NULL OR EXTRACT(YEAR FROM AGE(CURRENT_DATE, c.fecha_nacimiento)) <= $2) AND
                ($3::varchar IS NULL OR c.nacionalidad = $3)
            ORDER BY 
                c.nombre ASC;
        `;

        // Ejecutar la consulta con parámetros
        const result = await pool.query(query, [
            edad_min || null, 
            edad_max || null, 
            nacionalidad || null
        ]);

        // Enviar los resultados como respuesta
        res.json(result.rows);
    } catch (error) {
        console.error('Error al segmentar clientes:', error);
        res.status(500).json({ message: 'Error al segmentar clientes' });
    }
};


/*
// Segmentación de clientes por historial de compras
exports.segmentarClientesPorCompras = async (req, res) => {
    try {
        const { min_compras, max_compras } = req.query;

        const query = `
            SELECT c.id, c.nombre, c.apellido, 
                   COUNT(v.id) AS total_compras, 
                   SUM(v.total) AS total_gastado
            FROM clientes c
            LEFT JOIN ventas v ON c.id = v.cliente_id
            GROUP BY c.id, c.nombre, c.apellido
            HAVING COUNT(v.id) BETWEEN $1 AND $2;
        `;
        const params = [min_compras || 0, max_compras || 9999];

        console.log("Consulta generada:", query);
        console.log("Parámetros:", params);

        const { rows } = await pool.query(query, params);
        console.log("Resultados de la consulta:", rows);

        res.status(200).json(rows);
    } catch (error) {
        console.error('Error durante la segmentación por compras:', error);
        res.status(500).json({ error: 'Error al segmentar clientes por historial de compras' });
    }
};

// Segmentación de clientes inactivos
exports.segmentarClientesInactivos = async (req, res) => {
    try {
        const { meses } = req.query;

        const query = `
            SELECT c.id, c.nombre, c.apellido, 
                   MAX(v.createdat) AS ultima_compra
            FROM clientes c
            LEFT JOIN ventas v ON c.id = v.cliente_id
            GROUP BY c.id, c.nombre, c.apellido
            HAVING (CURRENT_DATE - MAX(v.createdat)) > (30 * $1);
        `;
        const params = [meses || 0]; // Por defecto, meses será 0 si no se proporciona

        console.log("Consulta generada:", query);
        console.log("Parámetros:", params);

        const { rows } = await pool.query(query, params);
        console.log("Resultados de la consulta:", rows);

        res.status(200).json(rows);
    } catch (error) {
        console.error('Error durante la segmentación de clientes inactivos:', error);
        res.status(500).json({ error: 'Error al segmentar clientes inactivos' });
    }
};
*/