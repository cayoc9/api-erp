// config/config.js
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

module.exports = {
  development: {
    username: process.env.DB_USER_DEV || 'user_dev',
    password: process.env.DB_PASSWORD_DEV || 'h9856ju985jh596',
    database: process.env.DB_NAME_DEV || 'erp_hospitalar_dev',
    host: process.env.DB_HOST_DEV || '10.100.65.91',
    dialect: 'postgres',
    port: process.env.DB_PORT_DEV || 5432,
  },
  test: {
    username: process.env.DB_USER_TEST || 'seu_usuario_test',
    password: process.env.DB_PASSWORD_TEST || 'sua_senha_test',
    database: process.env.DB_NAME_TEST || 'nome_do_banco_test',
    host: process.env.DB_HOST_TEST || '10.100.65.91',
    dialect: 'postgres',
    port: process.env.DB_PORT_TEST || 5432,
  },
  production: {
    username: process.env.DB_USER_PROD || 'default_user',
    password: process.env.DB_PASSWORD_PROD || 'default_password',
    database: process.env.DB_NAME_PROD || 'default_db',
    host: process.env.DB_HOST_PROD || '10.100.65.91',
    dialect: 'postgres',
    port: process.env.DB_PORT_PROD || 5432, // Corrigido para o padrão do PostgreSQL
  },
};
