const express = require('express');
const router = express.Router();
const reportesController = require('../controllers/reportes.controller');

// Rutas para los reportes
router.get('/uso-puntos', reportesController.getUsoPuntos);
router.get('/bolsa-puntos', reportesController.getBolsaPuntos);
router.get('/puntos-a-vencer', reportesController.getPuntosPorVencer);
router.get('/buscar-clientes', reportesController.buscarClientes);
router.get('/calcular-puntos', reportesController.calcularPuntos);

module.exports = router;
