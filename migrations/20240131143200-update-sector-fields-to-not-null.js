'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.changeColumn('failures', 'sectorReporterId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'sectors',
          key: 'id'
        }
      }, { transaction });

      await queryInterface.changeColumn('failures', 'sectorResponsibleId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'sectors',
          key: 'id'
        }
      }, { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.changeColumn('failures', 'sectorReporterId', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'sectors',
          key: 'id'
        }
      }, { transaction });

      await queryInterface.changeColumn('failures', 'sectorResponsibleId', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'sectors',
          key: 'id'
        }
      }, { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};