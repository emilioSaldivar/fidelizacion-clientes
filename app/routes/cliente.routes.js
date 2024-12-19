const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/cliente.controller.js");
<<<<<<< HEAD
const authenticateJWT = require('../middleware/authMiddleware.js');

router.post("/clientes",authenticateJWT,clienteController.createCliente);
router.get("/clientes", authenticateJWT,clienteController.getClientes);
router.get("/clientes/:id", authenticateJWT,clienteController.getClienteById);
router.put("/clientes/:id", authenticateJWT,clienteController.updateCliente);
router.delete("/clientes/:id", authenticateJWT,clienteController.deleteCliente);
=======

router.post("/clientes", clienteController.createCliente);
router.get("/clientes", clienteController.getClientes);
router.get("/clientes/:id", clienteController.getClienteById);
router.put("/clientes/:id", clienteController.updateCliente);
router.delete("/clientes/:id", clienteController.deleteCliente);
>>>>>>> d9cb542766cad15bf602b89e909a19c2b4e4d475

module.exports = router;
