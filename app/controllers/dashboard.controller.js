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

// Obtener métricas del dashboard
exports.getDashboardMetrics = async (req, res) => {
    try {
        // 1. Tasa de Retención de Clientes
        const queryClientesInicio = `
            SELECT COUNT(*) AS clientes_inicio
            FROM public.clientes
            WHERE createdat <= CURRENT_DATE;
        `;

        const queryClientesActivos = `
            SELECT COUNT(DISTINCT clientes.id) AS clientes_activos
            FROM public.clientes
            JOIN public.bolsa_puntos ON bolsa_puntos.cliente_id = clientes.id
            WHERE bolsa_puntos.saldo_puntos > 0;
        `;

        const clientesInicioResult = await pool.query(queryClientesInicio);
        const clientesActivosResult = await pool.query(queryClientesActivos);

        const clientesInicio = parseInt(clientesInicioResult.rows[0].clientes_inicio, 10) || 0;
        const clientesActivos = parseInt(clientesActivosResult.rows[0].clientes_activos, 10) || 0;

        const tasaRetencion = clientesInicio
            ? ((clientesActivos / clientesInicio) * 100).toFixed(2)
            : 0;

        // 2. Número de Puntos Canjeados
        const queryPuntosCanjeados = `
            SELECT SUM(puntaje_utilizado) AS puntos_canjeados
            FROM public.bolsa_puntos
            WHERE puntaje_utilizado > 0;
        `;

        const puntosCanjeadosResult = await pool.query(queryPuntosCanjeados);
        const puntosCanjeados = parseInt(puntosCanjeadosResult.rows[0].puntos_canjeados, 10) || 0;

        // 3. Retorno de la Inversión (ROI)
        const queryVentasConPuntos = `
            SELECT SUM(ventas.total) AS ventas_con_puntos
            FROM public.ventas
            JOIN public.bolsa_puntos ON bolsa_puntos.venta_id = ventas.id
            WHERE bolsa_puntos.puntaje_utilizado > 0;
        `;

        const ventasConPuntosResult = await pool.query(queryVentasConPuntos);
        const ventasConPuntos = parseFloat(ventasConPuntosResult.rows[0].ventas_con_puntos) || 0;

        const costePrograma = 10000; // Valor estimado para el programa
        const roi = ((ventasConPuntos - costePrograma) / costePrograma).toFixed(2);

        // Responder con los resultados
        res.status(200).json({
            tasaRetencion: `${tasaRetencion}%`,
            puntosCanjeados,
            roi,
        });
    } catch (error) {
        console.error('Error al obtener métricas del dashboard:', error);
        res.status(500).json({ message: 'Error al obtener métricas del dashboard.' });
    }
};
