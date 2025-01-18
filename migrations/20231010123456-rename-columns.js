'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('failures', 'prontuarioCode', 'prontuario_code');
    await queryInterface.renameColumn('failures', 'hospitalId', 'hospital_id');
    await queryInterface.renameColumn('failures', 'sectorId', 'sector_id');
    await queryInterface.renameColumn('failures', 'professionalId', 'professional_id');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('failures', 'prontuario_code', 'prontuarioCode');
    await queryInterface.renameColumn('failures', 'hospital_id', 'hospitalId');
    await queryInterface.renameColumn('failures', 'sector_id', 'sectorId');
    await queryInterface.renameColumn('failures', 'professional_id', 'professionalId');
  }
};
