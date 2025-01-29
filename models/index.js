// models/index.js
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

// Importação dos modelos
const Hospital = require('./Hospital');
const Sector = require('./Sector');
const Professional = require('./Professional');
const Failure = require('./Failure');
const Form = require('./Form');
const TPInconsistencies = require('./TP_Inconsistencies');
const FailureInconsistencyType = require('./FailureInconsistencyType');
const Indicator = require('./Indicator');
const HospitalGroup = require('./HospitalGroup');
const Patient = require('./Patient');
const Internment = require('./Internment');
const MedicalRecord = require('./MedicalRecord');
const HospitalSubGroup = require('./HospitalSubGroup');

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

// 4. Relações de Professional e Failure
Professional.hasMany(Failure, {
  foreignKey: 'professionalId',
  as: 'failures'
});
Professional.hasMany(Failure, {
  foreignKey: 'auditorId',
  as: 'audits'
});
Failure.belongsTo(Professional, { foreignKey: 'professionalId', as: 'professional' });
Failure.belongsTo(Professional, { foreignKey: 'auditorId', as: 'auditor' });

// 5. Relações de Form e Failure
Form.hasMany(Failure, { foreignKey: 'formId', as: 'failures' });
Failure.belongsTo(Form, { foreignKey: 'formId', as: 'form' });

// 6. Relação Muitos-para-Muitos entre Failure e TPInconsistencies
Failure.belongsToMany(TPInconsistencies, {
  through: FailureInconsistencyType,
  foreignKey: 'failureId',
  otherKey: 'inconsistencyTypeId',
  as: 'inconsistencyTypes'
});

TPInconsistencies.belongsToMany(Failure, {
  through: FailureInconsistencyType,
  foreignKey: 'inconsistencyTypeId',
  otherKey: 'failureId',
  as: 'failures'
});

// 7. Relações de Patient
Patient.hasMany(Internment, { foreignKey: 'patientId', as: 'internments' });
Patient.hasMany(MedicalRecord, { foreignKey: 'patientId', as: 'medicalRecords' });

// 8. Relações de Internment
Internment.belongsTo(Patient, { foreignKey: 'patientId', as: 'patient' });
Internment.belongsTo(Sector, { foreignKey: 'dischargeSectorId', as: 'dischargeSector' });
Internment.hasMany(Failure, { foreignKey: 'internmentId', as: 'failures' });

// 9. Relações de MedicalRecord
MedicalRecord.belongsTo(Professional, { foreignKey: 'auditorId', as: 'auditor' });
MedicalRecord.belongsTo(Sector, { foreignKey: 'auditorSectorId', as: 'auditorSector' });
MedicalRecord.belongsTo(Patient, { foreignKey: 'patientId', as: 'patient' });
MedicalRecord.belongsTo(Sector, { foreignKey: 'dischargeSectorId', as: 'dischargeSector' });
MedicalRecord.hasMany(Failure, { foreignKey: 'medicalRecordId', as: 'failures' });

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

// Definir ordem de sincronização
const models = {
  HospitalGroup,
  HospitalSubGroup,
  Hospital,
  Sector,
  Professional,
  Patient,
  MedicalRecord,
  Internment,
  Form,
  TPInconsistencies,
  Failure,
  FailureInconsistencyType
};

// Sincronizar modelos em ordem
const syncModels = async () => {
  for (const modelName of Object.keys(models)) {
    await models[modelName].sync();
  }
};

// Exportação dos modelos e da instância do Sequelize
module.exports = {
  sequelize,
  Sequelize,
  ...models,
  syncModels
};
