// models/Sector.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const BaseModel = require('./BaseModel');

class Sector extends BaseModel { }

Sector.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    hospitalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'hospitals',
        key: 'id',
      },
    },
  },
  {
    tableName: 'sectors',
    sequelize,
  }
);

module.exports = Sector;
