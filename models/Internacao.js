const BaseModel = require('./ModeloBase');
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Internment extends BaseModel {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            patientId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'patient_id',
                references: {
                    model: 'patients',
                    key: 'id'
                }
            },
            admissionDate: {
                type: DataTypes.DATE,
                allowNull: false,
                field: 'admission_date'
            },
            dischargeDate: {
                type: DataTypes.DATE,
                allowNull: true,
                field: 'discharge_date'
            },
            dischargeSectorId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                field: 'discharge_sector_id',
                references: {
                    model: 'sectors',
                    key: 'id'
                }
            }
        }, {
            sequelize,
            tableName: 'internments'
        });
    }

    static associate(models) {
        this.belongsTo(models.Patient, {
            foreignKey: 'patientId',
            as: 'patient'
        });
        this.belongsTo(models.Sector, {
            foreignKey: 'dischargeSectorId',
            as: 'dischargeSector'
        });
        this.hasMany(models.Failure, {
            foreignKey: 'internmentId',
            as: 'failures'
        });
    }
}

Internment.init(sequelize);

module.exports = Internment; 