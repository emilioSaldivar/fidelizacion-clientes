// Importa la configuración del pool de pg
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

// Función para ejecutar el procedimiento actualizar_bolsas_vencidas
exports.actualizarBolsasVencidas = async (req, res) => {
    try {
        // Ejecutar el procedimiento almacenado
        const result = await pool.query('SELECT actualizar_bolsas_vencidas();');
        res.json({ message: 'Bolsas de puntos actualizadas', result: result });
    } catch (error) {
        console.error('Error al actualizar bolsas de puntos:', error);
        res.status(500).json({ message: 'Error al actualizar bolsas de puntos' });
    }
};
