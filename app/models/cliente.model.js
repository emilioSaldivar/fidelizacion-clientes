module.exports = (sequelize, DataTypes) => {
    const Cliente = sequelize.define("cliente", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        apellido: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        numero_documento: {
            type: DataTypes.STRING(50),
            allowNull: true,
            unique: true, // Configuración única para el campo numero_documento
        },
        tipo_documento: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        nacionalidad: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: true,
            validate: {
                isEmail: true,
            },
        },
        telefono: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        fecha_nacimiento: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
    }, {
        tableName: "clientes",
        schema: "public",
        timestamps: true, // Habilita timestamps para manejar automáticamente createdAt y updatedAt
        createdAt: 'createdat', // Mapea el nombre del campo createdAt a createdat
        updatedAt: 'updatedat', // Mapea el nombre del campo updatedAt a updatedat
    });
        
        Cliente.associate = (models) => {
            Cliente.belongsTo(models.UsoPuntos, {
                foreignKey: "cliente_id",
                as: "uso_puntos",
            });
        }
        Cliente.associate = (models) => {
            Cliente.hasMany(models.Referido, { as: "referidos", foreignKey: "referidor_id" });
            Cliente.hasMany(models.Referido, { as: "referido_por", foreignKey: "referido_id" });
        };
        
    return Cliente;
};
