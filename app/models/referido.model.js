module.exports = (sequelize, DataTypes) => {
    const Referido = sequelize.define("referidos", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        referidor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        referido_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        primera_compra_realizada: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    }, {
        tableName: 'referidos',
        schema: 'public',
        timestamps: true,
        createdAt: 'createdat',
        updatedAt: 'updatedat',
    });

    Referido.associate = (models) => {
        Referido.belongsTo(models.Cliente, { as: "referidor", foreignKey: "referidor_id" });
        Referido.belongsTo(models.Cliente, { as: "referido", foreignKey: "referido_id" });
    };

    return Referido;
};
