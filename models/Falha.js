// Renomear para Falha.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ModeloBase = require('./ModeloBase');

class Falha extends ModeloBase { }

Falha.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipoInconsistenciaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipos_inconsistencia',
        key: 'id',
      },
    },
    // ... outros campos já em português
  },
  {
    tableName: 'falhas',
    sequelize,
  }
);

module.exports = Falha;
