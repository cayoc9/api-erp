// config/database.js
const { Sequelize } = require('sequelize');
const config = require('./config'); // Certifique-se de que o caminho está correto
const env = process.env.NODE_ENV || 'development';

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
