const express = require('express');
const router = express.Router();
const integracionController = require('../controllers/integracion.controller');

// Rutas para el modelo Cliente
router.get('/clientes', integracionController.obtenerClientes); // Obtener todos los clientes
router.get('/clientes/:numero_documento', integracionController.obtenerClientePorNumeroDocumento); // Obtener cliente por ID
router.get('/clientes/:numero_documento/saldo-puntos', integracionController.consultarSaldoPuntos);// Consultar el saldo de puntos de un cliente por su número de documento
module.exports = router;