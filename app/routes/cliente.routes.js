const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/cliente.controller.js");
const authenticateJWT = require('../middleware/authMiddleware.js');

router.post("/clientes",authenticateJWT,clienteController.createCliente);
router.get("/clientes", authenticateJWT,clienteController.getClientes);
router.get("/clientes/:id", authenticateJWT,clienteController.getClienteById);
router.put("/clientes/:id", authenticateJWT,clienteController.updateCliente);
router.delete("/clientes/:id", authenticateJWT,clienteController.deleteCliente);

module.exports = router;
