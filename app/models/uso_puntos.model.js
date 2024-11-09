// uso_puntos.model.js

module.exports = (sequelize, DataTypes) => {
    const UsoPuntos = sequelize.define("uso_puntos", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        cliente_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "clientes",
                key: "id",
            },
            onDelete: "CASCADE",
        },
        puntaje_utilizado: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        concepto_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "conceptos",
                key: "id",
            },
            onDelete: "SET NULL",
        },
        createdat: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedat: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, {
        tableName: "uso_puntos",
        timestamps: false,
    });

    // Relación con la tabla Clientes
    UsoPuntos.associate = (models) => {
        UsoPuntos.belongsTo(models.Clientes, {
            foreignKey: "cliente_id",
            as: "cliente",
        });

        // Relación con la tabla Conceptos
        UsoPuntos.belongsTo(models.Conceptos, {
            foreignKey: "concepto_id",
            as: "concepto",
        });

        // Relación con la tabla DetalleUsoPuntos
        UsoPuntos.hasMany(models.DetalleUsoPuntos, {
            foreignKey: "uso_puntos_id",
            as: "detallesUso",
        });
    };

    return UsoPuntos;
};
