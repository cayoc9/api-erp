/**
 * Model que representa os tipos de inconsistências (TPInconsistencies).
 * Armazena 'description', 'status' (se está ativo/inativo) e campos de tracking.
 */
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const tpInconsistenciesSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  description: {
    type: DataTypes.STRING(225),
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  createDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  createUser: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  updateDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  updateUser: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}

const TPInconsistencies = sequelize.define('TPInconsistencies', tpInconsistenciesSchema, {
  tableName: 'tp_inconsistencies',
  timestamps: false, // Caso não use createdAt/updatedAt automáticos
});

module.exports = TPInconsistencies;
