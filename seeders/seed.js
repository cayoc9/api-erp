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

    // 4. Insere todos os Hospitals de uma vez
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
      {
        name: 'Hospital Santa Maria',
        address: 'Av. dos Ipês, 789',
        groupId: hospitalGroups[0].id,
        createDate: new Date('2024-12-22 00:01:53.864+00'),
        updateDate: new Date('2024-12-23 10:30:00.000+00'),
        createUser: 1,
        updateUser: 2
      },
      {
        name: 'Hospital São Lucas',
        address: 'Rua das Palmeiras, 321',
        groupId: hospitalGroups[1].id,
        createDate: new Date('2024-12-22 00:01:53.864+00'),
        updateDate: new Date('2024-12-23 11:15:00.000+00'),
        createUser: 2,
        updateUser: 3
      },
      {
        name: 'Hospital Nossa Senhora',
        address: 'Av. Brasil, 567',
        groupId: hospitalGroups[0].id,
        createDate: new Date('2024-12-22 00:01:53.864+00'),
        updateDate: new Date('2024-12-23 14:20:00.000+00'),
        createUser: 3,
        updateUser: 1
      },
      {
        name: 'Hospital Samaritano',
        address: 'Rua das Flores, 890',
        groupId: hospitalGroups[1].id,
        createDate: new Date('2024-12-22 00:01:53.864+00'),
        updateDate: new Date('2024-12-23 16:45:00.000+00'),
        createUser: 1,
        updateUser: 2
      },
      {
        name: 'Hospital Albert Einstein',
        address: 'Av. das Árvores, 234',
        groupId: hospitalGroups[0].id,
        createDate: new Date('2024-12-22 00:01:53.864+00'),
        updateDate: new Date('2024-12-23 09:10:00.000+00'),
        createUser: 2,
        updateUser: 3
      },
      {
        name: 'Hospital São Francisco',
        address: 'Rua dos Girassóis, 432',
        groupId: hospitalGroups[1].id,
        createDate: new Date('2024-12-22 00:01:53.864+00'),
        updateDate: new Date('2024-12-23 13:25:00.000+00'),
        createUser: 3,
        updateUser: 1
      }
    ], { returning: true, transaction });
    console.log('Dados inseridos em Hospitals.');

    // 5. Insere Sectors
    const sectors = await Sector.bulkCreate([
      {
        name: 'Setor de Emergência',
        hospitalId: hospitals[0].id,
        createDate: new Date('2024-12-22 00:01:53.866+00'),
        createUser: 1,
        updateDate: new Date('2024-12-23 10:15:00.000+00'),
        updateUser: 2
      },
      {
        name: 'Setor de Radiologia',
        hospitalId: hospitals[1].id,
        createDate: new Date('2024-12-22 00:01:53.866+00'),
        createUser: 2,
        updateDate: new Date('2024-12-23 11:30:00.000+00'),
        updateUser: 1
      },
      {
        name: '2º Andar Ginecologia',
        hospitalId: hospitals[0].id,
        createDate: new Date('2024-12-22 00:01:53.866+00'),
        createUser: 1,
        updateDate: new Date('2024-12-23 09:00:00.000+00'),
        updateUser: 3
      },
      {
        name: '2º Obstetrícia',
        hospitalId: hospitals[1].id,
        createDate: new Date('2024-12-22 00:01:53.866+00'),
        createUser: 2,
        updateDate: new Date('2024-12-23 14:45:00.000+00'),
        updateUser: 1
      },
      {
        name: '3º Andar Cirúrgica',
        hospitalId: hospitals[2].id,
        createDate: new Date('2024-12-22 00:01:53.866+00'),
        createUser: 3,
        updateDate: new Date('2024-12-23 15:20:00.000+00'),
        updateUser: 2
      },
      {
        name: '4º Andar Clínica Médica I',
        hospitalId: hospitals[3].id,
        createDate: new Date('2024-12-22 00:01:53.866+00'),
        createUser: 1,
        updateDate: new Date('2024-12-23 16:10:00.000+00'),
        updateUser: 3
      },
      {
        name: '4º Andar Nefrologia',
        hospitalId: hospitals[4].id,
        createDate: new Date('2024-12-22 00:01:53.866+00'),
        createUser: 2,
        updateDate: new Date('2024-12-23 12:40:00.000+00'),
        updateUser: 1
      },
      {
        name: '5º Andar Clínica Médica II',
        hospitalId: hospitals[5].id,
        createDate: new Date('2024-12-22 00:01:53.866+00'),
        createUser: 3,
        updateDate: new Date('2024-12-23 13:55:00.000+00'),
        updateUser: 2
      },
      {
        name: '6º Andar Pediátrica',
        hospitalId: hospitals[0].id,
        createDate: new Date('2024-12-22 00:01:53.866+00'),
        createUser: 1,
        updateDate: new Date('2024-12-23 17:30:00.000+00'),
        updateUser: 3
      },
      {
        name: 'ALA B',
        hospitalId: hospitals[1].id,
        createDate: new Date('2024-12-22 00:01:53.866+00'),
        createUser: 2,
        updateDate: new Date('2024-12-23 18:15:00.000+00'),
        updateUser: 1
      }
    ], { returning: true, transaction });
    console.log('Dados inseridos em Sectors.');

    // 6. Insere Responsibles (Profissionais)
    const responsibles = await Responsible.bulkCreate([
      {
        name: 'Dr. João Silva',
        role: 'Médico(a)',
        createDate: new Date('2024-12-22 00:01:53.868+00'),
        updateDate: new Date('2024-12-23 10:30:00.000+00'),
        createUser: 1,
        updateUser: 2
      },
      {
        name: 'Dra. Maria Souza',
        role: 'Médico(a)',
        createDate: new Date('2024-12-22 00:01:53.868+00'),
        updateDate: new Date('2024-12-23 11:15:00.000+00'),
        createUser: 2,
        updateUser: 1
      },
      {
        name: 'ABDIAS BAPTISTA DE MELLO NETO',
        role: 'Médico(a)',
        createDate: new Date('2024-12-22 00:01:53.868+00'),
        createUser: 1,
        updateDate: new Date('2024-12-23 12:00:00.000+00'),
        updateUser: 2
      },
      {
        name: 'ADAIANE AMELIA BACCIN',
        role: 'Enfermeiro(a) e/ou Técnico(a)',
        createDate: new Date('2024-12-22 00:01:53.868+00'),
        createUser: 2,
        updateDate: new Date('2024-12-23 13:30:00.000+00'),
        updateUser: 3
      },
      {
        name: 'ADALBERTO CERON ROESLER',
        role: 'Médico(a) Residente',
        createDate: new Date('2024-12-22 00:01:53.868+00'),
        createUser: 3,
        updateDate: new Date('2024-12-23 14:45:00.000+00'),
        updateUser: 1
      },
      {
        name: 'ADALGISO FEIJO MALAGUEZ',
        role: 'AUDITOR',
        createDate: new Date('2024-12-22 00:01:53.868+00'),
        createUser: 1,
        updateDate: new Date('2024-12-23 15:20:00.000+00'),
        updateUser: 2
      },
      {
        name: 'ADAO ADEMIR DA SILVA',
        role: 'Outros Profissionais de Saúde',
        createDate: new Date('2024-12-22 00:01:53.868+00'),
        createUser: 2,
        updateDate: new Date('2024-12-23 16:10:00.000+00'),
        updateUser: 3
      },
      {
        name: 'ADECIR MARIO BEZERRA BISPO',
        role: 'Outros(as) Profissionais',
        createDate: new Date('2024-12-22 00:01:53.868+00'),
        createUser: 3,
        updateDate: new Date('2024-12-23 17:00:00.000+00'),
        updateUser: 1
      },
      {
        name: 'ADELAINE MARILIA PINHEIRO',
        role: 'Enfermeiro(a) e/ou Técnico(a)',
        createDate: new Date('2024-12-22 00:01:53.868+00'),
        createUser: 1,
        updateDate: new Date('2024-12-23 18:15:00.000+00'),
        updateUser: 2
      },
      {
        name: 'ADELIA LAUERMANN',
        role: 'Médico(a)',
        createDate: new Date('2024-12-22 00:01:53.868+00'),
        createUser: 2,
        updateDate: new Date('2024-12-23 19:30:00.000+00'),
        updateUser: 3
      }
    ], { returning: true, transaction });
    console.log('Dados inseridos em Responsibles.');

    // 7. Insere Forms
    const forms = await Form.bulkCreate([
      { description: 'Formulário de Admissão' },
      { description: 'Formulário de Alta' },
    ], { returning: true, transaction });
    console.log('Dados inseridos em Forms.');
    await Form.bulkCreate([
      {
        description: 'Anamnese',
        createDate: new Date('2024-12-22 00:01:53.869+00'),
        status: 'ativo'
      },
      {
        description: 'Comunicado Órteses/Próteses',
        createDate: new Date('2024-12-22 00:01:53.869+00'),
        status: 'ativo'
      },
      {
        description: 'Consultas Ambulatoriais',
        createDate: new Date('2024-12-22 00:01:53.869+00'),
        status: 'ativo'
      },
      {
        description: 'Cuidados Enfermagem',
        createDate: new Date('2024-12-22 00:01:53.869+00'),
        status: 'ativo'
      },
      {
        description: 'Declaração Nascido Vivo',
        createDate: new Date('2024-12-22 00:01:53.869+00'),
        status: 'ativo'
      },
      {
        description: 'Declaração de Óbito',
        createDate: new Date('2024-12-22 00:01:53.869+00'),
        status: 'ativo'
      },
      {
        description: 'Evolução de Enfermagem',
        createDate: new Date('2024-12-22 00:01:53.869+00'),
        status: 'ativo'
      },
      {
        description: 'Relatório de Falha',
        createDate: new Date('2025-01-07 04:04:19.494+00'),
        status: 'ativo'
      }
    ], { returning: true, transaction });


    // 8. Insere TPInconsistencies
    const tpInconsistencies = await TPInconsistencies.bulkCreate([
      {
        description: 'Checagem irregular',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'Embalagem de OPME ausente',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'Formulário ausente',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'Formulário incompleto (etiquetas de rastreabilidade de OPME)',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'Formulário incompleto (indicadores de esterilização)',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'Formulário sem assinatura do paciente/responsável',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'Formulário sem registro',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'Formulário/Registro sem data',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'Procedimento incompatível',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'Registro ausente',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'Registro em formulário incorreto',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'Registro em formulário não padronizado institucionalmente',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'Registro ilegível',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'Registro incompleto',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'Registro incorreto',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'Registro rasurado',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'Registro sem assinatura do profissional',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'Registro sem assinatura e sem identificação do profissional',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'Registro sem identificação do profissional',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'Documento de imagem ausente',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'Documento(s) entregue com atraso no Faturamento/Produção',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'Registro sem assinatura do responsável/acompanhante',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'Conta fora do prazo de apresentação',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'Extravio de Prontuário',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'Faturamento inválido por falta de habilitação/serviço e classificação',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'Formulário danificado',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'Internação não cadastrada no Sistema de Regulação',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'OPME não compatível com o Procedimento Principal',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'OPME utilizado em quantidade excedente',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'Paciente atendido sem cadastro no ERP (sistema hospitalar)',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'Paciente com alta no ERP (sistema hospitalar), sem a correspondente baixa no Sistema de Regulação',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'Procedimento realizado não consta na Tabela SUS',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'Prontuário incompleto',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'Profissional de saúde não cadastrado ou com erro de cadastro no SCNES',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'Prontuário com documento(s) de outro(s) paciente(s)',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'Prontuário fora da ordem padronizada institucionalmente',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'Internação sem número de AIH atribuído',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'CID ausente',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'CID incoerente com o tratamento realizado',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'Nota Fiscal sem código de barras - Controle INTERNO OPME',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'Cadastro do paciente em duplicidade no ERP (sistema hospitalar)',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'Falta registro de alta hospitalar',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'Falta registro de alta hospitalar - RN não internado',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'Falta registro do TIPO de alta',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'Codificação de OPME com inconsistência',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      },
      {
        description: 'Nota Fiscal - Ocorrências diversas',
        status: true,
        createDate: new Date('2025-01-05 17:19:26.17215+00')
      }
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

    // 10. Faz commit na transação
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
