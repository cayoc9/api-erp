'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Função auxiliar para verificar se uma coluna existe
    const columnExists = async (tableName, columnName) => {
      const query = `
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = '${tableName}' 
        AND column_name = '${columnName}'`;
      const [results] = await queryInterface.sequelize.query(query);
      return results.length > 0;
    };

    try {
      // Adiciona coluna createdAt se não existir
      if (!(await columnExists('failures', 'createdAt'))) {
        await queryInterface.addColumn('failures', 'createdAt', {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('NOW')
        });
      }

      // Adiciona coluna resolvedAt se não existir
      if (!(await columnExists('failures', 'resolvedAt'))) {
        await queryInterface.addColumn('failures', 'resolvedAt', {
          type: Sequelize.DATE,
          allowNull: true
        });
      }

      // Adiciona coluna sectorReporterId se não existir
      if (!(await columnExists('failures', 'sectorReporterId'))) {
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
      }

      // Adiciona coluna sectorResponsibleId se não existir
      if (!(await columnExists('failures', 'sectorResponsibleId'))) {
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
      }

      // Adiciona coluna status se não existir
      if (!(await columnExists('failures', 'status'))) {
        // Cria o tipo ENUM se não existir
        await queryInterface.sequelize.query(`
          DO $$ 
          BEGIN 
            IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_failures_status') THEN
              CREATE TYPE "enum_failures_status" AS ENUM ('PENDING', 'RESOLVED');
            END IF;
          END$$;
        `);

        await queryInterface.addColumn('failures', 'status', {
          type: Sequelize.ENUM('PENDING', 'RESOLVED'),
          allowNull: false,
          defaultValue: 'PENDING'
        });
      }

      // Cria a tabela de associação se não existir
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
      }, {
        // Ignora se a tabela já existir
        force: false
      });

      // Adiciona índices para melhorar a performance (ignora se já existirem)
      const addIndexIfNotExists = async (tableName, fields) => {
        const indexName = `${tableName}_${fields.join('_')}_idx`;
        try {
          await queryInterface.addIndex(tableName, fields, { name: indexName });
        } catch (error) {
          if (!error.message.includes('already exists')) throw error;
        }
      };

      await addIndexIfNotExists('failures', ['createdAt']);
      await addIndexIfNotExists('failures', ['resolvedAt']);
      await addIndexIfNotExists('failures', ['status']);
      await addIndexIfNotExists('failures', ['sectorReporterId']);
      await addIndexIfNotExists('failures', ['sectorResponsibleId']);

    } catch (error) {
      console.error('Erro na migração:', error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Função para remover índice se existir
    const removeIndexIfExists = async (tableName, fields) => {
      try {
        await queryInterface.removeIndex(tableName, fields);
      } catch (error) {
        if (!error.message.includes('does not exist')) throw error;
      }
    };

    // Remove os índices se existirem
    await removeIndexIfExists('failures', ['createdAt']);
    await removeIndexIfExists('failures', ['resolvedAt']);
    await removeIndexIfExists('failures', ['status']);
    await removeIndexIfExists('failures', ['sectorReporterId']);
    await removeIndexIfExists('failures', ['sectorResponsibleId']);

    // Remove as colunas se existirem
    await queryInterface.sequelize.query(`
      DO $$ 
      BEGIN 
        ALTER TABLE failures 
          DROP COLUMN IF EXISTS createdAt,
          DROP COLUMN IF EXISTS resolvedAt,
          DROP COLUMN IF EXISTS sectorReporterId,
          DROP COLUMN IF EXISTS sectorResponsibleId,
          DROP COLUMN IF EXISTS status;
      EXCEPTION
        WHEN others THEN null;
      END $$;
    `);

    // Remove o tipo ENUM se existir
    await queryInterface.sequelize.query(`
      DROP TYPE IF EXISTS "enum_failures_status";
    `);

    // Remove a tabela de associação
    await queryInterface.dropTable('failures_tp_inconsistencies', {
      force: true
    });
  }
};