const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const BaseModel = require('./ModeloBase');

class HospitalSubGroup extends BaseModel { }

HospitalSubGroup.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        groupId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'hospital_groups',
                key: 'id',
            },
        },
    },
    {
        tableName: 'hospital_subgroups',
        sequelize,
    }
);

module.exports = HospitalSubGroup; 