'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('forms', 'status', {
      type: Sequelize.ENUM('ativo', 'inativo'),
      allowNull: false,
      defaultValue: 'ativo'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeColumn('forms', 'status', { transaction });
      await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_forms_status";', { transaction });
    });
  }
};
