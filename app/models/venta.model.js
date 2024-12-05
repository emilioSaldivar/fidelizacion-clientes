module.exports = (sequelize, Sequelize) => {
    const Ventas = sequelize.define("ventas", {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        cliente_id: {  // Cambiado de 'cliente' a 'cliente_id' para reflejar la relación con 'clientes'
            type: Sequelize.INTEGER,
            references: {
                model: 'clientes',  // Nombre de la tabla a la que hace referencia
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        total: {
            type: Sequelize.BIGINT
        },
        factura: {
            type: Sequelize.STRING
        }
    });
    Ventas.associate = (models) => {
        Ventas.belongsTo(models.Cliente, { as: "cliente", foreignKey: "cliente_id" });
    };
    return Ventas;
};
