const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const responsibleSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  role: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'Interno'
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

class Responsible extends Model {
  static associate(models) {
    Responsible.hasMany(models.Failure, {
      foreignKey: 'professionalId',
      as: 'failures'
    });
  }
}

Responsible.init(responsibleSchema, {
  sequelize,
  modelName: 'Responsible',
  tableName: 'responsibles',
  timestamps: false,
  underscored: true
});

module.exports = Responsible;
