/**
 * Este script faz a população inicial (seed) do banco de dados, criando registros
 * em todas as tabelas necessárias: HospitalGroup, Hospital, Sector, Responsible,
 * Form, TPInconsistencies, Indicator e Failure.
 *
 * Ele utiliza a estratégia de 'transaction' para garantir que todos os inserts
 * ocorram de forma atômica (se algo falhar, faz rollback).
 */

require('dotenv').config();
const {
  sequelize,
  HospitalGroup,
  Hospital,
  Sector,
  Responsible,
  Form,
  TPInconsistencies,
  Indicator,
  Failure
} = require('../models');

async function seed() {
  const transaction = await sequelize.transaction();
  try {
    // 1. Conecta ao banco
    await sequelize.authenticate();
    console.log('Conectado ao banco de dados.');

    // 2. Sincroniza modelos sem recriar a estrutura
    await sequelize.sync({ force: false, transaction });
    console.log('Modelos sincronizados.');

    // 3. Insere Groups
    const hospitalGroups = await HospitalGroup.bulkCreate([
      { description: 'Grupo A' },
      { description: 'Grupo B' },
    ], { returning: true, transaction });
    console.log('Dados inseridos em HospitalGroups.');

    // 4. Insere Hospitals
    const hospitals = await Hospital.bulkCreate([
      {
        name: 'Hospital Central',
        address: 'Rua Principal, 123',
        groupId: hospitalGroups[0].id
      },
      {
        name: 'Hospital das Clínicas',
        address: 'Av. Secundária, 456',
        groupId: hospitalGroups[1].id
      },
    ], { returning: true, transaction });
    console.log('Dados inseridos em Hospitals.');

    // 5. Insere Sectors
    const sectors = await Sector.bulkCreate([
      {
        name: 'Setor de Emergência',
        hospitalId: hospitals[0].id
      },
      {
        name: 'Setor de Radiologia',
        hospitalId: hospitals[1].id
      },
    ], { returning: true, transaction });
    console.log('Dados inseridos em Sectors.');

    // 6. Insere Responsibles (Profissionais)
    const responsibles = await Responsible.bulkCreate([
      { name: 'Dr. João Silva', email: 'joao.silva@hospital.com' },
      { name: 'Dra. Maria Souza', email: 'maria.souza@hospital.com' },
    ], { returning: true, transaction });
    console.log('Dados inseridos em Responsibles.');

    // 7. Insere Forms
    const forms = await Form.bulkCreate([
      { description: 'Formulário de Admissão' },
      { description: 'Formulário de Alta' },
    ], { returning: true, transaction });
    console.log('Dados inseridos em Forms.');

    // 8. Insere TPInconsistencies
    const tpInconsistencies = await TPInconsistencies.bulkCreate([
      { description: 'Dados Incompletos', status: true },
      { description: 'Informação Duplicada', status: true },
    ], { returning: true, transaction });
    console.log('Dados inseridos em TPInconsistencies.');

    // 9. Insere Indicators
    await Indicator.bulkCreate([
      {
        name: 'Tempo médio de espera',
        value: 30.0,
        description: 'Tempo médio que os pacientes esperam',
        status: true
      },
      {
        name: 'Taxa de ocupação de leitos',
        value: 85.0,
        description: 'Percentual de ocupação dos leitos disponíveis',
        status: true
      },
    ], { transaction });
    console.log('Dados inseridos em Indicators.');

    // 10. Insere Failures (Falhas)
    await Failure.bulkCreate([
      {
        description: 'Erro de registro de paciente',
        prontuarioCode: '123456',   // Campo STRING
        formularioId: forms[0].id,
        formularioDate: new Date(), // Campo DATE
        inconsistencyId: tpInconsistencies[0].id, // Caso seja 1:1, do outro modo seria N:N
        professionalId: responsibles[0].id,
        hospitalId: hospitals[0].id,
        sectorId: sectors[0].id,
        status: 'Open',
        createDate: new Date(),
        createUser: responsibles[0].id,
        updateDate: null,
        updateUser: null,
        // observacoes: 'Algum texto aqui...' // Caso queira popular
      },
      {
        description: 'Falha na impressão de relatório',
        prontuarioCode: '654321',
        formularioId: forms[1].id,
        formularioDate: new Date(),
        inconsistencyId: tpInconsistencies[1].id,
        professionalId: responsibles[1].id,
        hospitalId: hospitals[1].id,
        sectorId: sectors[1].id,
        status: 'Open',
        createDate: new Date(),
        createUser: responsibles[1].id,
        updateDate: null,
        updateUser: null,
      },
    ], { transaction });
    console.log('Dados inseridos em Failures.');

    // 11. Faz commit na transação
    await transaction.commit();
    console.log('Seeding concluído com sucesso.');
    process.exit(0);

  } catch (error) {
    // Rollback em caso de falha
    await transaction.rollback();
    console.error('Erro durante o seeding:', error);
    process.exit(1);
  }
}

seed();
