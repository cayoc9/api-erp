// models/HospitalGroup.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const HospitalGroup = sequelize.define('HospitalGroup', {
  id: {
    type: DataTypes.INTEGER, // CD_GRUPO_HOSPITAL
    primaryKey: true,
    autoIncrement: true, // Se `CD_GRUPO_HOSPITAL` é auto-increment
  },
  description: { // DS_GRUPO
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  createDate: { // CREATE_DATE
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
  createUser: { // CREATE_USER
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  updateDate: { // UPDATE_DATE
    type: DataTypes.DATE,
    allowNull: true,
  },
  updateUser: { // UPDATE_USER
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'hospital_groups',
  timestamps: false,
});

module.exports = HospitalGroup;
