/**
 * Model que representa os tipos de inconsistências (TPInconsistencies).
 * Armazena 'description', 'status' (se está ativo/inativo) e campos de tracking.
 */
const BaseModel = require('./BaseModel');
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class InconsistencyType extends BaseModel {
  static init(sequelize) {
    super.init({
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
      }
    }, {
      sequelize,
      tableName: 'inconsistency_types',
      freezeTableName: true
    });
  }

  static associate(models) {
    this.belongsToMany(models.Failure, {
      through: 'failure_inconsistency_types',
      foreignKey: 'inconsistencyTypeId',
      otherKey: 'failureId',
      as: 'failures'
    });
  }
}

InconsistencyType.init(sequelize);

module.exports = InconsistencyType;
