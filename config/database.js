// config/database.js
require('dotenv').config();
const { Sequelize } = require('sequelize');
const config = require('./config'); // Certifique-se de que o caminho está correto

// Adicionar log para debug
console.log('\x1b[33m%s\x1b[0m', `[ENV Debug] NODE_ENV=${process.env.NODE_ENV}`);

const env = 'production'; //ambiente forçado para produção (process.env.NODE_ENV ||)

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
  }
);

module.exports = sequelize;
