// models/concepto.model.js
module.exports = (sequelize, Sequelize) => {
    const Concepto = sequelize.define("conceptos", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        descripcion: {
            type: Sequelize.STRING,
            allowNull: false
        },
        puntos_requeridos: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
    return Concepto;
};
