const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const professionalSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    role: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'Interno'
    },
    type: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            isIn: [['auditor', 'professional']]
        }
    },
    origin: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
            isIn: [['cnes', 'internal']]
        }
    },
    cnesStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'cnes_status'
    },
    createDate: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'create_date'
    },
    createUser: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'create_user'
    },
    updateDate: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'update_date'
    },
    updateUser: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'update_user'
    }
};

class Professional extends Model {
    static associate(models) {
        Professional.hasMany(models.Failure, {
            foreignKey: 'professionalId',
            as: 'failures'
        });
        Professional.hasMany(models.Failure, {
            foreignKey: 'auditorId',
            as: 'auditorias'
        });
    }
}

Professional.init(professionalSchema, {
    sequelize,
    modelName: 'Professional',
    tableName: 'professionals',
    timestamps: false,
    underscored: true
});

module.exports = Professional; 