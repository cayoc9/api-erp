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
