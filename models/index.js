// models/index.js
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

// Importação dos modelos
const Hospital = require('./Hospital');
const Setor = require('./Setor');
const Profissional = require('./Profissional');
const Falha = require('./Falha');
const Formulario = require('./Formulario');
const Indicador = require('./Indicador');
const GrupoHospitalar = require('./GrupoHospitalar');
const Paciente = require('./Paciente');
const Internacao = require('./Internacao');
const Prontuario = require('./Prontuario');
const SubgrupoHospitalar = require('./SubgrupoHospitalar');
const TipoInconsistencia = require('./TipoInconsistencia');

// ======================
// 1. Associações do GrupoHospitalar
// ======================
GrupoHospitalar.hasMany(SubgrupoHospitalar, {
  foreignKey: 'grupoId',
  as: 'subgrupos'
});

SubgrupoHospitalar.belongsTo(GrupoHospitalar, {
  foreignKey: 'grupoId',
  as: 'grupoHospitalar'
});

// ======================
// 2. Associações do SubgrupoHospitalar
// ======================
SubgrupoHospitalar.hasMany(Hospital, {
  foreignKey: 'subgrupoId',
  as: 'hospitais'
});

Hospital.belongsTo(SubgrupoHospitalar, {
  foreignKey: 'subgrupoId',
  as: 'subgrupoHospitalar'
});

// ======================
// 3. Associações do Hospital
// ======================
Hospital.hasMany(Setor, {
  foreignKey: 'hospitalId',
  as: 'setores'
});

Hospital.hasMany(Falha, {
  foreignKey: 'hospitalId',
  as: 'falhas'
});

// ======================
// 4. Associações do Setor
// ======================
Setor.belongsTo(Hospital, {
  foreignKey: 'hospitalId',
  as: 'hospital'
});

Setor.hasMany(Falha, {
  foreignKey: 'setorId',
  as: 'falhas'
});

// ======================
// 5. Associações do Profissional
// ======================
Profissional.hasMany(Falha, {
  foreignKey: 'profissionalId',
  as: 'falhas'
});

Profissional.hasMany(Falha, {
  foreignKey: 'auditorId',
  as: 'auditorias'
});

// ======================
// 6. Associações do Paciente
// ======================
Paciente.hasMany(Internacao, {
  foreignKey: 'pacienteId',
  as: 'internacoes'
});

Paciente.hasMany(Prontuario, {
  foreignKey: 'pacienteId',
  as: 'prontuarios'
});

// ======================
// 7. Associações da Internação
// ======================
Internacao.belongsTo(Paciente, {
  foreignKey: 'pacienteId',
  as: 'paciente'
});

Internacao.belongsTo(Setor, {
  foreignKey: 'setorAltaId',
  as: 'setorAlta'
});

Internacao.hasMany(Falha, {
  foreignKey: 'internacaoId',
  as: 'falhas'
});

// ======================
// 8. Associações do Prontuário
// ======================
Prontuario.belongsTo(Profissional, {
  foreignKey: 'auditorId',
  as: 'auditor'
});

Prontuario.belongsTo(Setor, {
  foreignKey: 'setorAuditorId',
  as: 'setorAuditor'
});

Prontuario.belongsTo(Paciente, {
  foreignKey: 'pacienteId',
  as: 'paciente'
});

Prontuario.belongsTo(Setor, {
  foreignKey: 'setorAltaId',
  as: 'setorAlta'
});

Prontuario.hasMany(Falha, {
  foreignKey: 'prontuarioId',
  as: 'falhas'
});

// ======================
// 9. Associações da Falha
// ======================
Falha.belongsTo(Profissional, {
  foreignKey: 'profissionalId',
  as: 'profissional'
});

Falha.belongsTo(Profissional, {
  foreignKey: 'auditorId',
  as: 'auditor'
});

Falha.belongsTo(Formulario, {
  foreignKey: 'formularioId',
  as: 'formulario'
});

Falha.belongsTo(Prontuario, {
  foreignKey: 'prontuarioId',
  as: 'prontuario'
});

Falha.belongsTo(Setor, {
  foreignKey: 'setorRelatorId',
  as: 'setorRelator'
});

Falha.belongsTo(Setor, {
  foreignKey: 'setorResponsavelId',
  as: 'setorResponsavel'
});

Falha.belongsTo(Hospital, {
  foreignKey: 'hospitalId',
  as: 'hospital'
});

// ======================
// 10. Associações do TipoInconsistencia
// ======================
Falha.belongsTo(TipoInconsistencia, {
  foreignKey: 'tipoInconsistenciaId',
  as: 'tipoInconsistencia'
});

TipoInconsistencia.hasMany(Falha, {
  foreignKey: 'tipoInconsistenciaId',
  as: 'falhas'
});

// Definir ordem de sincronização
const modelos = {
  GrupoHospitalar,
  SubgrupoHospitalar,
  Hospital,
  Setor,
  Profissional,
  Paciente,
  Prontuario,
  Internacao,
  Formulario,
  TipoInconsistencia,
  Falha,
};

// Sincronizar modelos em ordem
const sincronizarModelos = async () => {
  for (const nomeModelo of Object.keys(modelos)) {
    await modelos[nomeModelo].sync();
  }
};

// Exportação dos modelos e da instância do Sequelize
module.exports = {
  sequelize,
  Sequelize,
  ...modelos,
  sincronizarModelos
};
