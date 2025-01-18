'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const tableInfo = await queryInterface.describeTable('responsibles');

      if (!tableInfo.role) {
        await queryInterface.addColumn('responsibles', 'role', {
          type: Sequelize.STRING(50),
          allowNull: false,
          defaultValue: 'Técnico'
        }, { transaction });

        await queryInterface.addIndex('responsibles', ['role'], { transaction });
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeIndex('responsibles', ['role'], { transaction });
      await queryInterface.removeColumn('responsibles', 'role', { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};