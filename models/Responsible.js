const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const responsibleSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  createDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  createUser: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  updateDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  updateUser: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}

class Responsible extends Model {}

Responsible.init(responsibleSchema, {
  sequelize,
  modelName: 'Responsible',
  tableName: 'responsibles',
  timestamps: false,
});

module.exports = Responsible;
