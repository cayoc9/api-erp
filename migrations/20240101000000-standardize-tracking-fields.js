'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tables = [
      'failures', 'forms', 'hospital_groups', 'hospitals',
      'indicators', 'responsibles', 'sectors', 'tp_inconsistencies'
    ];

    for (const table of tables) {
      // Renomear createdAt para createDate
      await queryInterface.renameColumn(table, 'createdAt', 'createDate');
      
      // Renomear updatedAt para updateDate  
      await queryInterface.renameColumn(table, 'updatedAt', 'updateDate');
      
      // Adicionar campos de usuário
      await queryInterface.addColumn(table, 'createUser', {
        type: Sequelize.INTEGER,
        allowNull: true
      });
      
      await queryInterface.addColumn(table, 'updateUser', {
        type: Sequelize.INTEGER,
        allowNull: true
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    const tables = [
      'failures', 'forms', 'hospital_groups', 'hospitals',
      'indicators', 'responsibles', 'sectors', 'tp_inconsistencies'
    ];

    for (const table of tables) {
      await queryInterface.renameColumn(table, 'createDate', 'createdAt');
      await queryInterface.renameColumn(table, 'updateDate', 'updatedAt');
      await queryInterface.removeColumn(table, 'createUser');
      await queryInterface.removeColumn(table, 'updateUser');
    }
  }
};
