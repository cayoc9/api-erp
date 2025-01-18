'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tables = [
      'failures', 'forms', 'hospital_groups', 'hospitals',
      'indicators', 'responsibles', 'sectors', 'tp_inconsistencies'
    ];

    for (const table of tables) {
      // Verificar estrutura da tabela
      const tableInfo = await queryInterface.describeTable(table);
      
      // Renomear apenas se existir createdAt e não existir createDate
      if (tableInfo.createdAt && !tableInfo.createDate) {
        await queryInterface.renameColumn(table, 'createdAt', 'createDate');
      }
      
      // Renomear apenas se existir updatedAt e não existir updateDate
      if (tableInfo.updatedAt && !tableInfo.updateDate) {
        await queryInterface.renameColumn(table, 'updatedAt', 'updateDate');
      }
      
      // Adicionar campos de usuário se não existirem
      if (!tableInfo.createUser) {
        await queryInterface.addColumn(table, 'createUser', {
          type: Sequelize.INTEGER,
          allowNull: true
        });
      }
      
      if (!tableInfo.updateUser) {
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
      const tableInfo = await queryInterface.describeTable(table);
      
      if (tableInfo.createDate) {
        await queryInterface.renameColumn(table, 'createDate', 'createdAt');
      }
      
      if (tableInfo.updateDate) {
        await queryInterface.renameColumn(table, 'updateDate', 'updatedAt');
      }
      
      if (tableInfo.createUser) {
        await queryInterface.removeColumn(table, 'createUser');
      }
      
      if (tableInfo.updateUser) {
        await queryInterface.removeColumn(table, 'updateUser');
      }
    }
  }
};
