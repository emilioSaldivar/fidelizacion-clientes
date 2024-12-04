module.exports = (sequelize, DataTypes) => {
    const Vencimiento = sequelize.define('Vencimiento', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        fecha_inicio: {
            type: DataTypes.DATE,
            allowNull: false
        },
        fecha_fin: {
            type: DataTypes.DATE,
            allowNull: false
        },
        duracion_dias: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdat: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedat: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'vencimientos_puntos',
        timestamps: false
    });

    return Vencimiento;
};