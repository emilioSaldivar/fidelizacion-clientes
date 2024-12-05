const express = require('express');
const router = express.Router();
const reportesController = require('../controllers/reportes.controller');
const authenticateJWT = require('../middleware/authMiddleware.js');
// Rutas para los reportes
router.get('/uso-puntos',authenticateJWT, reportesController.getUsoPuntos);
router.get('/bolsa-puntos',authenticateJWT, reportesController.getBolsaPuntos);
router.get('/puntos-a-vencer',authenticateJWT, reportesController.getPuntosPorVencer);
router.get('/buscar-clientes',authenticateJWT, reportesController.buscarClientes);
router.get('/calcular-puntos',authenticateJWT, reportesController.calcularPuntos);

module.exports = router;
