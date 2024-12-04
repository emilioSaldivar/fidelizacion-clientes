module.exports = (sequelize, DataTypes) => {
    const Respuesta = sequelize.define("Respuesta", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        cliente_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pregunta_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        respuesta_texto: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        tableName: 'respuestas',
        timestamps: true,  // Genera createdAt y updatedAt
    });

    Respuesta.associate = (models) => {
        // Relación con cliente y pregunta
        Respuesta.belongsTo(models.Cliente, { foreignKey: "cliente_id" });
        Respuesta.belongsTo(models.Pregunta, { foreignKey: "pregunta_id" });
    };

    return Respuesta;
};
