// models/Hospital.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Hospital = sequelize.define('Hospital', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(60),
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
  address: { // Novo campo adicionado
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
  },
  createDate: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
  createUser: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  updateDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  updateUser: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'hospitals',
  timestamps: false,
});

module.exports = Hospital;
