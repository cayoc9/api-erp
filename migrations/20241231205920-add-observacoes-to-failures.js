'use strict';

/**
 * Migration que adiciona a coluna 'observacoes' na tabela 'failures'.
 * Gera um erro caso a coluna já exista, então utilize com cautela em produção.
 */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Failures', 'observacoes', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Se for preciso reverter, remove a coluna 'observacoes'
    await queryInterface.removeColumn('Failures', 'observacoes');
  }
};
