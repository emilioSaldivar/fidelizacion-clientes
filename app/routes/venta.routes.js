module.exports = app => {
    const venta = require("../controllers/venta.controller.js");
    var router = require("express").Router();
    router.post("/", venta.create);
    router.get("/", venta.findAll);
    router.get("/:id", venta.findOne);
    app.use('/api/venta', router);
};
