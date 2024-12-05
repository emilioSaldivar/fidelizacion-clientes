const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/segmentar.controller.js');
const authenticateJWT = require('../middleware/authMiddleware.js');

// Rutas para segmentación de clientes

router.get("/segmentar",authenticateJWT, clienteController.segmentarClientes);

module.exports = router;
