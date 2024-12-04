module.exports = (sequelize, Sequelize) => {
    const BolsaPuntos = sequelize.define("bolsa_puntos", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        cliente_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        venta_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
        },
        fecha_asignacion: {
            type: Sequelize.DATEONLY,
            defaultValue: Sequelize.NOW,
        },
        fecha_caducidad: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        puntaje_asignado: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        puntaje_utilizado: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        saldo_puntos: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        monto_operacion: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        createdAt: {
            type: Sequelize.DATE,
            field: 'createdat',
            defaultValue: Sequelize.NOW,
        },
        updatedAt: {
            type: Sequelize.DATE,
            field: 'updatedat',
            defaultValue: Sequelize.NOW,
        }
    }, {
        tableName: "bolsa_puntos",
        schema: "public",
        timestamps: true,
        createdAt: "createdat",
        updatedAt: "updatedat",
    });
    // Definición de relaciones
    BolsaPuntos.associate = (models) => {
        BolsaPuntos.belongsTo(models.Cliente, {
            foreignKey: "cliente_id",
            as: "cliente",
        });

        BolsaPuntos.belongsTo(models.Venta, {
            foreignKey: "venta_id",
            as: "venta",
        });
    };
    return BolsaPuntos;
};
