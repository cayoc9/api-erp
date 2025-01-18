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
    field: 'create_date', // Ajustar para o nome exato da coluna no banco
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
  createUser: { // CREATE_USER
    type: DataTypes.INTEGER,
    field: 'create_user', // Ajustar para o nome exato da coluna no banco
    allowNull: true,
  },
  updateDate: { // UPDATE_DATE
    type: DataTypes.DATE,
    field: 'update_date', // Ajustar para o nome exato da coluna no banco
    allowNull: true,
  },
  updateUser: { // UPDATE_USER
    type: DataTypes.INTEGER,
    field: 'update_user', // Ajustar para o nome exato da coluna no banco
    allowNull: true,
  }
}, {
  tableName: 'forms', // Especifica explicitamente o nome da tabela
  timestamps: false,  // Desativa timestamps automáticos
  underscored: true
});

module.exports = Form;
