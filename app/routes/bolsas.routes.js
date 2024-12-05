const express = require('express');
const router = express.Router();
const bolsasController = require('../controllers/bolsas.controller');
const authenticateJWT = require('../middleware/authMiddleware.js');

// Ruta para actualizar bolsas vencidas
router.get('/actualizar-bolsas-vencidas',authenticateJWT, bolsasController.actualizarBolsasVencidas);

module.exports = router;
