const express = require('express');
const router = express.Router();
const auth = require('../controllers/autenticacion.controller.js');

// Ruta para actualizar bolsas vencidas
router.get('/login', auth.login);

module.exports = router;
