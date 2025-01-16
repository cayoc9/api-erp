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
    allowNull: false
  },
  formularioId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  formularioDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  professionalId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  hospitalId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'hospitals',
      key: 'id'
    }
  },
  sectorId: {
    type: DataTypes.INTEGER,
    allowNull: false
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
  }
};

const Failure = sequelize.define('Failure', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  prontuarioCode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  formularioId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  formularioDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  professionalId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  hospitalId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'hospitals',
      key: 'id'
    }
  },
  sectorId: {
    type: DataTypes.INTEGER,
    allowNull: false
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
  }
}, {
  tableName: 'failures',
  timestamps: false,
});

module.exports = Failure;
