'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Indicators', {
      id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
      },
      name: {
      type: Sequelize.STRING(255),
      allowNull: false
      },
      value: {
      type: Sequelize.FLOAT,
      allowNull: false
      },
      description: {
      type: Sequelize.TEXT,
      allowNull: true
      },
      status: {
      type: Sequelize.STRING(50),
      allowNull: false,
      defaultValue: 'Active'
      },
      createUser: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1 // TODO: Alterar quando a tabela Users for criada
      },
      updateUser: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1 // TODO: Alterar quando a tabela Users for criada
      },
      createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('NOW()')
      },
      updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('NOW()')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Indicators');
  }
};