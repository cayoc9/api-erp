// models/index.js
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

// Importação dos modelos
const Hospital = require('./Hospital');
const Sector = require('./Sector');
const Responsible = require('./Responsible');
const Failure = require('./Failure');
const Form = require('./Form');
const TPInconsistencies = require('./TP_Inconsistencies');
const FailureTPInconsistencies = require('./FailureTP_Inconsistencies');
const Indicator = require('./Indicator');
const HospitalGroup = require('./HospitalGroup');

// Definição das associações

// 1. Relações de HospitalGroup e Hospital
HospitalGroup.hasMany(Hospital, { foreignKey: 'groupId', as: 'hospitals' });
Hospital.belongsTo(HospitalGroup, { foreignKey: 'groupId', as: 'hospitalGroup' });

// 2. Relações de Hospital e Sector
Hospital.hasMany(Sector, { foreignKey: 'hospitalId', as: 'sectors' });
Sector.belongsTo(Hospital, { foreignKey: 'hospitalId', as: 'hospital' });

// 3. Relações de Sector e Failure
Sector.hasMany(Failure, { foreignKey: 'sectorId', as: 'failures' });
Failure.belongsTo(Sector, { foreignKey: 'sectorId', as: 'sector' });

// 4. Relações de Responsible e Failure
Responsible.hasMany(Failure, { foreignKey: 'professionalId', as: 'failures' });
Failure.belongsTo(Responsible, { foreignKey: 'professionalId', as: 'responsible' });

// 5. Relações de Form e Failure
Form.hasMany(Failure, { foreignKey: 'formularioId', as: 'failures' });
Failure.belongsTo(Form, { foreignKey: 'formularioId', as: 'formulario' });

// 6. Relação Muitos-para-Muitos entre Failure e TPInconsistencies via FailureTPInconsistencies
Failure.belongsToMany(TPInconsistencies, {
  through: FailureTPInconsistencies,
  foreignKey: 'failureId',
  otherKey: 'tpInconsistencyId',
  as: 'tpInconsistencies',
});

TPInconsistencies.belongsToMany(Failure, {
  through: FailureTPInconsistencies,
  foreignKey: 'tpInconsistencyId',
  otherKey: 'failureId',
  as: 'failures',
});

// Associações para sectorReporter e sectorResponsible
Failure.belongsTo(Sector, {
  foreignKey: 'sectorReporterId',
  as: 'sectorReporter'
});

Failure.belongsTo(Sector, {
  foreignKey: 'sectorResponsibleId',
  as: 'sectorResponsible'
});

// Adicionar/verificar relacionamento
Hospital.hasMany(Failure, {
  foreignKey: 'hospitalId',
  as: 'failures'
});

Failure.belongsTo(Hospital, {
  foreignKey: 'hospitalId',
  as: 'hospital'
});

// Exportação dos modelos e da instância do Sequelize
module.exports = {
  sequelize,
  Sequelize,
  Hospital,
  Sector,
  Responsible,
  Failure,
  Form,
  TPInconsistencies,
  FailureTPInconsistencies,
  Indicator,
  HospitalGroup,
};
