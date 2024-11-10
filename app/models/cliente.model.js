// modelo cliente.js
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
            unique: true,
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
        tableName: "clientes",
        timestamps: false,
        schema: "public",
    });

    return Cliente;
};
