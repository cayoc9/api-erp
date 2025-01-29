// models/Hospital.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ModeloBase = require('./ModeloBase');

class Hospital extends ModeloBase { }

Hospital.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: 'ID único do hospital'
    },
    nome: {
      type: DataTypes.STRING(60),
      allowNull: false,
      comment: 'Nome oficial do hospital'
    },
    grupoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'grupos_hospitares',
        key: 'id',
      },
      comment: 'ID do grupo hospitalar'
    },
    uf: {
      type: DataTypes.STRING(2),
      allowNull: false,
      comment: 'Unidade Federativa (sigla)'
    },
    municipio: {
      type: DataTypes.STRING(60),
      allowNull: false,
      comment: 'Nome do município sede'
    },
    codigoCnes: {
      type: DataTypes.STRING(7),
      allowNull: false,
      unique: true,
      comment: 'Código CNES oficial'
    },
    codigoAcessoPlataforma: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: 'Código de acesso à plataforma integrada'
    },
    tipoHospital: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: 'Classificação do tipo de hospital'
    },
    sigla: {
      type: DataTypes.STRING(10),
      allowNull: true,
      comment: 'Sigla institucional'
    },
    cnpj: {
      type: DataTypes.STRING(14),
      allowNull: false,
      unique: true,
      comment: 'CNPJ sem formatação'
    },
    endereco: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: 'Endereço completo'
    },
    subgrupoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'subgrupos_hospitares',
        key: 'id',
      },
      comment: 'ID do subgrupo de gestão'
    },
  },
  {
    tableName: 'hospitais',
    sequelize,
    comment: 'Tabela de hospitais cadastrados no sistema'
  }
);

module.exports = Hospital;
