module.exports = (sequelize, DataTypes) => {
    const Concepto = sequelize.define("conceptos", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.STRING(255),  // Especificamos longitud máxima de 255 caracteres
            allowNull: false,
        },
        puntos_requeridos: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        tableName: 'conceptos',
        schema: 'public',
        timestamps: true,       // Activa timestamps para que Sequelize maneje createdAt y updatedAt
        createdAt: 'createdat', // Mapeamos createdAt al campo createdat
        updatedAt: 'updatedat', // Mapeamos updatedAt al campo updatedat
    });

    Concepto.associate = (models) => {
        Concepto.hasMany(models.UsoPuntos, {
            foreignKey: "concepto_id",
            as: "uso_puntos" // Alias para la relación inversa
        });
    };

    return Concepto;
};
