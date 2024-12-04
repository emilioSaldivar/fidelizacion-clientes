module.exports = (sequelize, DataTypes) => {
    const Pregunta = sequelize.define("Pregunta", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        pregunta_texto: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        tableName: 'preguntas',
        timestamps: true,  // Genera createdAt y updatedAt
    });

    Pregunta.associate = (models) => {
        // Relación con las respuestas
        Pregunta.hasMany(models.Respuesta, { foreignKey: "pregunta_id" });
    };

    return Pregunta;
};
