const express = require('express');
const router = express.Router();
const bolsasController = require('../controllers/bolsas.controller');

// Ruta para actualizar bolsas vencidas
router.get('/actualizar-bolsas-vencidas', bolsasController.actualizarBolsasVencidas);

module.exports = router;
