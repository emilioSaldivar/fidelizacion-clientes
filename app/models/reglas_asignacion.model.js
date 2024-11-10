module.exports = (sequelize, DataTypes) => {
    const ReglaAsignacion = sequelize.define("reglas_asignacion", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        limite_inferior: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        limite_superior: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        equivalencia_puntos: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        createdat: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedat: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    }, {
        tableName: 'reglas_asignacion',
        schema: 'public',
        timestamps: true,       // Activa timestamps para que Sequelize maneje createdAt y updatedAt
        createdAt: 'createdat', // Mapeamos createdAt al campo createdat
        updatedAt: 'updatedat', // Mapeamos updatedAt al campo updatedat
    });

    return ReglaAsignacion;
};
