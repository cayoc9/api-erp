// models/Failure.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const failureSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  prontuarioCode: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'prontuario_code'
  },
  formularioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'formulario_id'
  },
  formularioDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  professionalId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'professional_id'
  },
  hospitalId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'hospitals',
      key: 'id'
    },
    field: 'hospital_id'
  },
  sectorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'sector_id'
  },
  status: {
    type: DataTypes.STRING(20),
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
  },
  observacoes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  resolvedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  sectorReporterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'sectors',
      key: 'id'
    }
  },
  sectorResponsibleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'sectors',
      key: 'id'
    }
  }
};

const Failure = sequelize.define('Failure', failureSchema, {
  tableName: 'failures', // Importante: nome da tabela em minúsculo
  timestamps: true,
  createdAt: 'createDate',
  updatedAt: 'updateDate',
  underscored: true,
  freezeTableName: true
});

module.exports = Failure;
