module.exports = app => {
    const venta = require("../controllers/venta.controller.js");
    var router = require("express").Router();
    const authenticateJWT = require('../middleware/authMiddleware.js');
    router.post("/",authenticateJWT, venta.create);
    router.get("/",authenticateJWT, venta.findAll);
    router.get("/:id",authenticateJWT, venta.findOne);
    app.use('/api/venta',authenticateJWT, router);
};
