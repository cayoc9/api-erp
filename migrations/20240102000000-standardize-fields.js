'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tables = [
      'failures', 'forms', 'hospital_groups', 'hospitals',
      'indicators', 'responsibles', 'sectors', 'tp_inconsistencies'
    ];

    for (const table of tables) {
      // 1. Renomear tabelas para minúsculas
      await queryInterface.renameTable(table.charAt(0).toUpperCase() + table.slice(1), table);
      
      // 2. Padronizar campos de tracking
      await queryInterface.renameColumn(table, 'createdAt', 'createDate');
      await queryInterface.renameColumn(table, 'updatedAt', 'updateDate');
      
      // 3. Adicionar campos de usuário se não existirem
      const tableDesc = await queryInterface.describeTable(table);
      
      if (!tableDesc.createUser) {
        await queryInterface.addColumn(table, 'createUser', {
          type: Sequelize.INTEGER,
          allowNull: true
        });
      }
      
      if (!tableDesc.updateUser) {
        await queryInterface.addColumn(table, 'updateUser', {
          type: Sequelize.INTEGER,
          allowNull: true
        });
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    const tables = [
      'failures', 'forms', 'hospital_groups', 'hospitals',
      'indicators', 'responsibles', 'sectors', 'tp_inconsistencies'
    ];

    for (const table of tables) {
      // Reverter campos de tracking
      await queryInterface.renameColumn(table, 'createDate', 'createdAt');
      await queryInterface.renameColumn(table, 'updateDate', 'updatedAt');
      
      // Remover campos de usuário
      await queryInterface.removeColumn(table, 'createUser');
      await queryInterface.removeColumn(table, 'updateUser');
      
      // Reverter nome da tabela
      await queryInterface.renameTable(table, table.charAt(0).toUpperCase() + table.slice(1));
    }
  }
};
