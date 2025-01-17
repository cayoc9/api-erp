'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add new columns to Failures table
    await queryInterface.addColumn('failures', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW')
    });

    await queryInterface.addColumn('failures', 'resolvedAt', {
      type: Sequelize.DATE,
      allowNull: true
    });

    await queryInterface.addColumn('failures', 'sectorReporterId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'sectors',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    });

    await queryInterface.addColumn('failures', 'sectorResponsibleId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'sectors',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    });

    await queryInterface.addColumn('failures', 'status', {
      type: Sequelize.ENUM('PENDING', 'RESOLVED'),
      allowNull: false,
      defaultValue: 'PENDING'
    });

    // Create Failures_TPInconsistencies association table
    await queryInterface.createTable('failures_tp_inconsistencies', {
      failureId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'failures',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true
      },
      tpInconsistencyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tp_inconsistencies',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });

    // Add indexes for performance
    await queryInterface.addIndex('failures', ['createdAt']);
    await queryInterface.addIndex('failures', ['resolvedAt']);
    await queryInterface.addIndex('failures', ['status']);
    await queryInterface.addIndex('failures', ['sectorReporterId']);
    await queryInterface.addIndex('failures', ['sectorResponsibleId']);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove indexes
    await queryInterface.removeIndex('failures', ['createdAt']);
    await queryInterface.removeIndex('failures', ['resolvedAt']);
    await queryInterface.removeIndex('failures', ['status']);
    await queryInterface.removeIndex('failures', ['sectorReporterId']);
    await queryInterface.removeIndex('failures', ['sectorResponsibleId']);

    // Remove columns from Failures table
    await queryInterface.removeColumn('failures', 'createdAt');
    await queryInterface.removeColumn('failures', 'resolvedAt');
    await queryInterface.removeColumn('failures', 'sectorReporterId');
    await queryInterface.removeColumn('failures', 'sectorResponsibleId');
    await queryInterface.removeColumn('failures', 'status');

    // Drop the ENUM type
    await queryInterface.sequelize.query('DROP TYPE "enum_failures_status";');

    // Drop the association table
    await queryInterface.dropTable('failures_tp_inconsistencies');
  }
};