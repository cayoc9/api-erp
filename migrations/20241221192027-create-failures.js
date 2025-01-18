'use strict';

/** @type {import('sequelize-cli').Migration} */


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Failures', {
      id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
      },
      prontuarioCode: {
      type: Sequelize.STRING(100),
      allowNull: false
      },
      formularioId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'forms',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
      },
      formularioDate: {
      type: Sequelize.DATEONLY,
      allowNull: false
      },
      inconsistencyId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'tp_inconsistencies',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
      },
      professionalId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Responsibles',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
      },
      hospitalId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Hospitals',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
      },
      sectorId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Sectors',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
      },
      status: {
      type: Sequelize.STRING(50),
      allowNull: false,
      defaultValue: 'Pending'
      },
      createUser: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1  // Valor padrão 1 até criar tabela Users
      },
      updateUser: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1  // Valor padrão 1 até criar tabela Users
      },
      createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('NOW()')
      },
      updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('NOW()')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Failures');
  }
};