'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('forms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      createDate: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW
      },
      createUser: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      updateDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      updateUser: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      version: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('forms');
  }
};