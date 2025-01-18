'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const tableInfo = await queryInterface.describeTable('failures');

      if (!tableInfo.sectorReporterId) {
        await queryInterface.addColumn('failures', 'sectorReporterId', {
          type: Sequelize.INTEGER,
          allowNull: true, // Permitir nulos inicialmente
          references: {
            model: 'sectors',
            key: 'id'
          }
        }, { transaction });

        await queryInterface.addIndex('failures', ['sectorReporterId'], { transaction });
      }

      if (!tableInfo.sectorResponsibleId) {
        await queryInterface.addColumn('failures', 'sectorResponsibleId', {
          type: Sequelize.INTEGER,
          allowNull: true, // Permitir nulos inicialmente
          references: {
            model: 'sectors',
            key: 'id'
          }
        }, { transaction });

        await queryInterface.addIndex('failures', ['sectorResponsibleId'], { transaction });
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
      await queryInterface.removeIndex('failures', ['sectorReporterId'], { transaction });
      await queryInterface.removeIndex('failures', ['sectorResponsibleId'], { transaction });
      await queryInterface.removeColumn('failures', 'sectorResponsibleId', { transaction });
      await queryInterface.removeColumn('failures', 'sectorReporterId', { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};