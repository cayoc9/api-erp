// models/Sector.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Sector = sequelize.define('Sector', {
  id: {
    type: DataTypes.INTEGER, // CD_SETOR
    primaryKey: true,
    autoIncrement: true, // Se `CD_SETOR` é auto-increment
  },
  name: { // DS_SETOR
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  hospitalId: { // CD_HOSPITAL
    type: DataTypes.INTEGER, // Ajustado para INTEGER
    field: 'hospital_id', // Nome exato da coluna no banco
    allowNull: false,
    references: {
      model: 'hospitals',
      key: 'id',
    },
  },
  createDate: { // CREATE_DATE
    type: DataTypes.DATE,
    field: 'create_date',
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
  tableName: 'sectors',
  timestamps: false,
  underscored: true,
});

module.exports = Sector;
