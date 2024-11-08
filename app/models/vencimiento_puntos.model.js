module.exports = (sequelize, Sequelize) => {
    const VencimientoPuntos = sequelize.define("vencimientos_puntos", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        fecha_inicio: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        fecha_fin: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        duracion_dias: {
            type: Sequelize.INTEGER,
            allowNull: false,
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
        timestamps: true,
    });

    return VencimientoPuntos;
};
