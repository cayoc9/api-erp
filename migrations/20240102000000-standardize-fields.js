'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tables = [
      'failures', 'forms', 'hospital_groups', 'hospitals',
      'indicators', 'responsibles', 'sectors', 'tp_inconsistencies'
    ];

    for (const table of tables) {
      // Descrever a tabela para verificar a existência das colunas
      const tableDesc = await queryInterface.describeTable(table);

      // 1. Padronizar campos de tracking se existirem
      if (tableDesc.createdAt) {
        try {
          await queryInterface.renameColumn(table, 'createdAt', 'createDate');
          console.log(`Renomeado 'createdAt' para 'createDate' na tabela '${table}'.`);
        } catch (err) {
          console.error(`Erro ao renomear 'createdAt' para 'createDate' na tabela '${table}':`, err.message);
        }
      } else {
        console.log(`Coluna 'createdAt' não encontrada na tabela '${table}', ignorando renomeação.`);
      }

      if (tableDesc.updatedAt) {
        try {
          await queryInterface.renameColumn(table, 'updatedAt', 'updateDate');
          console.log(`Renomeado 'updatedAt' para 'updateDate' na tabela '${table}'.`);
        } catch (err) {
          console.error(`Erro ao renomear 'updatedAt' para 'updateDate' na tabela '${table}':`, err.message);
        }
      } else {
        console.log(`Coluna 'updatedAt' não encontrada na tabela '${table}', ignorando renomeação.`);
      }

      // 2. Adicionar campos de usuário se não existirem
      if (!tableDesc.createUser) {
        try {
          await queryInterface.addColumn(table, 'createUser', {
            type: Sequelize.INTEGER,
            allowNull: true
          });
          console.log(`Adicionado 'createUser' na tabela '${table}'.`);
        } catch (err) {
          console.error(`Erro ao adicionar 'createUser' na tabela '${table}':`, err.message);
        }
      } else {
        console.log(`Coluna 'createUser' já existe na tabela '${table}', ignorando adição.`);
      }

      if (!tableDesc.updateUser) {
        try {
          await queryInterface.addColumn(table, 'updateUser', {
            type: Sequelize.INTEGER,
            allowNull: true
          });
          console.log(`Adicionado 'updateUser' na tabela '${table}'.`);
        } catch (err) {
          console.error(`Erro ao adicionar 'updateUser' na tabela '${table}':`, err.message);
        }
      } else {
        console.log(`Coluna 'updateUser' já existe na tabela '${table}', ignorando adição.`);
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    const tables = [
      'failures', 'forms', 'hospital_groups', 'hospitals',
      'indicators', 'responsibles', 'sectors', 'tp_inconsistencies'
    ];

    for (const table of tables) {
      // Descrever a tabela para verificar a existência das colunas
      const tableDesc = await queryInterface.describeTable(table);

      // 1. Reverter campos de tracking se existirem
      if (tableDesc.createDate) {
        try {
          await queryInterface.renameColumn(table, 'createDate', 'createdAt');
          console.log(`Renomeado 'createDate' para 'createdAt' na tabela '${table}'.`);
        } catch (err) {
          console.error(`Erro ao renomear 'createDate' para 'createdAt' na tabela '${table}':`, err.message);
        }
      } else {
        console.log(`Coluna 'createDate' não encontrada na tabela '${table}', ignorando renomeação.`);
      }

      if (tableDesc.updateDate) {
        try {
          await queryInterface.renameColumn(table, 'updateDate', 'updatedAt');
          console.log(`Renomeado 'updateDate' para 'updatedAt' na tabela '${table}'.`);
        } catch (err) {
          console.error(`Erro ao renomear 'updateDate' para 'updatedAt' na tabela '${table}':`, err.message);
        }
      } else {
        console.log(`Coluna 'updateDate' não encontrada na tabela '${table}', ignorando renomeação.`);
      }

      // 2. Remover campos de usuário se existirem
      if (tableDesc.createUser) {
        try {
          await queryInterface.removeColumn(table, 'createUser');
          console.log(`Removido 'createUser' da tabela '${table}'.`);
        } catch (err) {
          console.error(`Erro ao remover 'createUser' da tabela '${table}':`, err.message);
        }
      } else {
        console.log(`Coluna 'createUser' não encontrada na tabela '${table}', ignorando remoção.`);
      }

      if (tableDesc.updateUser) {
        try {
          await queryInterface.removeColumn(table, 'updateUser');
          console.log(`Removido 'updateUser' da tabela '${table}'.`);
        } catch (err) {
          console.error(`Erro ao remover 'updateUser' da tabela '${table}':`, err.message);
        }
      } else {
        console.log(`Coluna 'updateUser' não encontrada na tabela '${table}', ignorando remoção.`);
      }
    }
  }
};
