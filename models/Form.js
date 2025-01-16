// models/Form.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Form = sequelize.define('Form', {
  id: {
    type: DataTypes.INTEGER, // CD_FORMULARIO
    primaryKey: true,
    autoIncrement: true,
  },
  description: { // DS_FORMULARIO
    type: DataTypes.STRING(30),
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
  }
}, {
  tableName: 'forms', // Especifica explicitamente o nome da tabela
  timestamps: false  // Desativa timestamps automáticos
});

module.exports = Form;
