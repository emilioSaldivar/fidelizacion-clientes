// routes/cliente.routes.js
const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/cliente.controller.js");

// Ruta para crear un nuevo cliente
router.post("/clientes", clienteController.createCliente);

// Ruta para obtener todos los clientes
router.get("/clientes", clienteController.getClientes);

// Ruta para obtener un cliente por ID
router.get("/clientes/:id", clienteController.getClienteById);

// Ruta para actualizar un cliente por ID
router.put("/clientes/:id", clienteController.updateCliente);

// Ruta para eliminar un cliente por ID
router.delete("/clientes/:id", clienteController.deleteCliente);

module.exports = router;