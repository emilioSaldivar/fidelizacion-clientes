module.exports = (sequelize, Sequelize) => {
    const Concepto = sequelize.define("Concepto", {
        descripcion: {
            type: Sequelize.STRING,
            allowNull: false
        },
        puntos_requeridos: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'conceptos',  // Esto especifica que Sequelize debe usar la tabla 'conceptos'
        createdAt: 'createdat',  // Configuramos el nombre de la columna en minúsculas
        updatedAt: 'updatedat'   // Lo mismo para updatedAt
    });

    return Concepto;
};
