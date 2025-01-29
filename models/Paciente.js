const BaseModel = require('./ModeloBase');
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Patient extends BaseModel {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            birthDate: {
                type: DataTypes.DATE,
                allowNull: true,
                field: 'birth_date'
            }
        }, {
            sequelize,
            tableName: 'patients'
        });
    }

    static associate(models) {
        this.hasMany(models.Internment, {
            foreignKey: 'patientId',
            as: 'internments'
        });
        this.hasMany(models.MedicalRecord, {
            foreignKey: 'patientId',
            as: 'medicalRecords'
        });
    }
}

Patient.init(sequelize);

module.exports = Patient; 