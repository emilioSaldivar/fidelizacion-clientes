// detalle_uso_puntos.model.js

module.exports = (sequelize, DataTypes) => {
    const DetalleUsoPuntos = sequelize.define("detalle_uso_puntos", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        uso_puntos_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "uso_puntos",
                key: "id",
            },
            onDelete: "CASCADE",
        },
        puntaje_utilizado: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        bolsa_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "bolsa_puntos",
                key: "id",
            },
            onDelete: "CASCADE",
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
        tableName: "detalle_uso_puntos",
        timestamps: false,
    });

    // Relación con la tabla UsoPuntos
    DetalleUsoPuntos.associate = (models) => {
        DetalleUsoPuntos.belongsTo(models.UsoPuntos, {
            foreignKey: "uso_puntos_id",
            as: "uso_puntos",
        });

        // Relación con la tabla BolsaPuntos
        DetalleUsoPuntos.belongsTo(models.BolsaPuntos, {
            foreignKey: "bolsa_id",
            as: "bolsa_puntos",
        });
    };

    return DetalleUsoPuntos;
};
