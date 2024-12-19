// routes/segmentacion_routes.js
const express = require('express');
const router = express.Router();
const segmentacionController = require('../controllers/segmentacion.controller.js');

// Ruta para segmentación de clientes
router.get('/segmentacion', segmentacionController.segmentarClientes);

//router.get('/segmentacion/compras', segmentacionController.segmentarClientesPorCompras);

//router.get('/segmentacion/inactivos', segmentacionController.segmentarClientesInactivos);

module.exports = router;
