module.exports = (sequelize, Sequelize) => {
    const ReglaAsignacion = sequelize.define("reglas_asignacion", {
        limite_inferior: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        limite_superior: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        equivalencia_puntos: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE,
            field: 'createdat',
            defaultValue: Sequelize.NOW
        },
        updatedAt: {
            type: Sequelize.DATE,
            field: 'updatedat',
            defaultValue: Sequelize.NOW
        }
    }, {
        tableName: 'reglas_asignacion',  // Esto especifica que Sequelize debe usar la tabla 'reglas_asignacion'
        createdAt: 'createdat',  // Configuramos el nombre de la columna en minúsculas
        updatedAt: 'updatedat'   // Lo mismo para updatedAt
    });
    return ReglaAsignacion;
};
