'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // Verificar se a coluna existe
      const tableInfo = await queryInterface.describeTable('failures');
      
      if (!tableInfo.observacoes) {
        await queryInterface.addColumn('failures', 'observacoes', {
          type: Sequelize.TEXT,
          allowNull: true
        }, { transaction });
      }
      
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Não remove a coluna no down para evitar perda de dados
    console.log('Skipping down migration for safety');
  }
};
