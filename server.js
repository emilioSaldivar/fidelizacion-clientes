const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const db = require("./app/models");
db.sequelize.sync();

const corsOptions = {
    origin: "http://localhost:9091"
};
app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Simple route
app.get("/", (req, res) => {
    res.json({ message: "Bienvenido Node backend 2020" });
});

// Importar y registrar rutas de ventas
require("./app/routes/venta.routes")(app);


// Cuando la ruta no está definida enviar 404
// Importar y registrar rutas
const conceptoRoutes = require("./app/routes/concepto.routes");
app.use("/api", conceptoRoutes);  // Registrar las rutas bajo el prefijo /api
const reglasAsignacionRoutes = require("./app/routes/reglas_asignacion.routes");
app.use("/api", reglasAsignacionRoutes); // Agregar rutas de reglas de asignación
// Importar y registrar rutas de vencimientos de puntos
const vencimientoPuntosRoutes = require("./app/routes/vencimiento_puntos.routes");
app.use("/api", vencimientoPuntosRoutes);
const usoPuntosRoutes = require("./app/routes/uso_puntos.routes");
usoPuntosRoutes(app);

// Set port, listen for requests
const PORT = process.env.PORT || 9090;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto: ${PORT}`);
});