// models/Indicator.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const indicatorSchema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  name: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  value: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.BOOLEAN,
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

const Indicator = sequelize.define('Indicator', indicatorSchema, {
  tableName: 'indicators',
  timestamps: false,
});

module.exports = Indicator;
