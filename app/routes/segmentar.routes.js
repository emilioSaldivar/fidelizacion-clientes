const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/segmentar.controller.js');

// Rutas para segmentación de clientes

router.get("/segmentar", clienteController.segmentarClientes);

module.exports = router;
