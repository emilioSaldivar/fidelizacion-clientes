const { Pool } = require('pg');
require('dotenv').config();

// Configurar la conexión a PostgreSQL
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});
exports.segmentarClientes = async (req, res) => {
    const { edadMin, edadMax, ubicacion, comprasMin } = req.query;

    try {
        // Construir la consulta dinámica
        let query = `
            SELECT clientes.id, clientes.nombre, clientes.apellido, clientes.fecha_nacimiento, clientes.direccion, SUM(ventas.total) AS historial_compras
            FROM public.clientes
            LEFT JOIN public.ventas ON ventas.cliente_id = clientes.id
            WHERE 1=1
        `;

        const values = [];

        // Filtro por edad
        if (edadMin || edadMax) {
            let fechaMin = 'CURRENT_DATE';
            let fechaMax = 'CURRENT_DATE';

            if (edadMin) {
                // Formateamos la fecha según el parámetro edadMin
                fechaMin = `CURRENT_DATE - INTERVAL '${edadMin} YEAR'`;
            }

            if (edadMax) {
                // Formateamos la fecha según el parámetro edadMax
                fechaMax = `CURRENT_DATE - INTERVAL '${edadMax} YEAR'`;
            }

            query += ` AND clientes.fecha_nacimiento BETWEEN ${fechaMax} AND ${fechaMin}`;
        }

        // Filtro por ubicación (dirección)
        if (ubicacion) {
            query += ` AND clientes.direccion ILIKE '%${ubicacion}%'`;
        }

        // Filtro por historial de compras
        if (comprasMin) {
            query += ` GROUP BY clientes.id, clientes.nombre, clientes.apellido, clientes.fecha_nacimiento, clientes.direccion HAVING SUM(ventas.total) >= ${comprasMin}`;
        } else {
            // Si no se aplica el filtro de compras, se debe agrupar por todas las columnas seleccionadas
            query += ` GROUP BY clientes.id, clientes.nombre, clientes.apellido, clientes.fecha_nacimiento, clientes.direccion`;
        }

        // Ejecutar la consulta
        const result = await pool.query(query);

        // Enviar los resultados al cliente
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error al segmentar clientes:', error);
        res.status(500).json({ message: 'Error al segmentar clientes.' });
    }
};
