// models/Hospital.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const BaseModel = require('./BaseModel');

class Hospital extends BaseModel { }

Hospital.init(
  {
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
    state: {
      type: DataTypes.STRING(2),
      allowNull: false,
      defaultValue: '',
      comment: 'Sigla do estado (2 caracteres)'
    },
    city: {
      type: DataTypes.STRING(60),
      allowNull: false,
      defaultValue: '',
    },
    cnesCode: {
      type: DataTypes.STRING(7),
      allowNull: false,
      unique: true,
      comment: 'Código CNES (7 dígitos)'
    },
    platformAccessCode: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    hospitalType: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: 'Tipo de instituição hospitalar'
    },
    acronym: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    cnpj: {
      type: DataTypes.STRING(14),
      allowNull: false,
      unique: true,
      comment: 'CNPJ sem formatação (14 dígitos)'
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
    },
    subGroupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'hospital_subgroups',
        key: 'id',
      },
    },
  },
  {
    tableName: 'hospitals',
    sequelize,
  }
);

module.exports = Hospital;
