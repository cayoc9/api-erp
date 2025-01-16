'use strict';

/**
 * Migration que cria a tabela 'TP_Inconsistencies'.
 * Obs.: a property 'type' (Sequelize.STRING(255)) e 'description' (Sequelize.TEXT) podem ter divergido
 * do que está no Model. Ajuste de acordo com a necessidade real.
 */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TP_Inconsistencies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // 'type' pode ser renomeado para 'description' se for coerente com o Model
      type: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
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
    await queryInterface.dropTable('TP_Inconsistencies');
  }
};
