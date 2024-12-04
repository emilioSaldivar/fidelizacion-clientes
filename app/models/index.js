require('dotenv').config();
const dbConfig = require('../config/db.config.js');
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    //operatorsAliases: false,
    port: dbConfig.PORT,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
    logging: console.log, // Para verificar logs durante la depuración
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Ventas = require("./venta.model.js")(sequelize, Sequelize);
db.Concepto = require("./concepto.model.js")(sequelize, Sequelize);
db.reglas_asignacion = require("./reglas_asignacion.model.js")(sequelize, Sequelize);
db.vencimiento_puntos = require("./vencimiento_puntos.model.js")(sequelize, Sequelize);
db.bolsa_puntos = require("./bolsa_puntos.model.js")(sequelize, Sequelize);
db.uso_puntos = require("./uso_puntos.model.js")(sequelize, Sequelize.DataTypes);
db.detalle_uso_puntos = require("./detalle_uso_puntos.model.js")(sequelize, Sequelize.DataTypes);
db.cliente = require("./cliente.model.js")(sequelize, Sequelize.DataTypes);
module.exports = db;
