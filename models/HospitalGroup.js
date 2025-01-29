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
  subGroup: {
    type: DataTypes.STRING(50),
    allowNull: true,
    field: 'sub_group'
  },
  createDate: { // CREATE_DATE
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
    field: 'create_date'
  },
  createUser: { // CREATE_USER
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'create_user'
  },
  updateDate: { // UPDATE_DATE
    type: DataTypes.DATE,
    allowNull: true,
    field: 'update_date'
  },
  updateUser: { // UPDATE_USER
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'update_user'
  },
}, {
  tableName: 'hospital_groups',
  timestamps: false,
  underscored: true
});

module.exports = HospitalGroup;
