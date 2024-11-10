// models/cliente.model.js
module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define("Cliente", {
        nombre: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        apellido: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        numero_documento: {
            type: Sequelize.STRING(50),
            unique: true
        },
        tipo_documento: {
            type: Sequelize.STRING(20)
        },
        nacionalidad: {
            type: Sequelize.STRING(50)
        },
        email: {
            type: Sequelize.STRING(100),
            unique: true
        },
        telefono: {
            type: Sequelize.STRING(20)
        },
        fecha_nacimiento: {
            type: Sequelize.DATE
        }
    }, {
        tableName: 'clientes',  // Mapea a la tabla 'clientes' de tu BD
        timestamps: true,
        createdAt: 'createdat',
        updatedAt: 'updatedat'
    });

    return Cliente;
};
