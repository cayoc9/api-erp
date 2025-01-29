// models/Form.js
const BaseModel = require('./ModeloBase');
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Form extends BaseModel {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            description: {
                type: DataTypes.STRING(30),
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'forms'
        });
    }

    static associate(models) {
        this.hasMany(models.Failure, {
            foreignKey: 'formId',
            as: 'failures'
        });
    }
}

Form.init(sequelize);

module.exports = Form;
