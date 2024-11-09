const usoPuntosController = require("../controllers/uso_puntos.controller");

module.exports = (app) => {
    app.post("/api/uso-puntos", usoPuntosController.usarPuntos);
};
