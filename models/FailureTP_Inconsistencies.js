// models/FailureTPInconsistencies.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FailureTPInconsistencies = sequelize.define('FailureTPInconsistencies', {
  failureId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'failures',
      key: 'id',
    },
    primaryKey: true,
  },
  tpInconsistencyId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'tp_inconsistencies',
      key: 'id',
    },
    primaryKey: true,
  },
}, {
  tableName: 'failure_tp_inconsistencies',
  timestamps: false,
});

module.exports = FailureTPInconsistencies;
