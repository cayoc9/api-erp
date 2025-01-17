// config/database.js
require('dotenv').config();
const { Sequelize } = require('sequelize');
const config = require('./config'); // Certifique-se de que o caminho está correto

// Adicionar log para debug
console.log('\x1b[33m%s\x1b[0m', `[ENV Debug] NODE_ENV=${process.env.NODE_ENV}`);

const env = process.env.NODE_ENV || 'development';  //ambiente forçado para produção ()

console.log('\x1b[36m%s\x1b[0m', `[Database] Ambiente atual: ${env}`);

const sequelize = new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password,
  {
    host: config[env].host,
    dialect: config[env].dialect,
    port: config[env].port,
    logging: false, // POder Desabilitar logs SQL se desejado
    define: {
      underscored: true,
      freezeTableName: true,
      timestamps: true,
      createdAt: 'createDate',
      updatedAt: 'updateDate'
    }
  }
);

module.exports = sequelize;
