// models/index.js
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

// Importação dos modelos
const Hospital = require('./Hospital');
const Sector = require('./Sector');
const Professional = require('./Professional');
const Failure = require('./Failure');
const Form = require('./Form');
const FailureInconsistencyType = require('./FailureInconsistencyType');
const Indicator = require('./Indicator');
const HospitalGroup = require('./HospitalGroup');
const Patient = require('./Patient');
const Internment = require('./Internment');
const MedicalRecord = require('./MedicalRecord');
const HospitalSubGroup = require('./HospitalSubGroup');
const InconsistencyType = require('./InconsistencyType.js');

// ======================
// 1. Associações do HospitalGroup
// ======================
HospitalGroup.hasMany(HospitalSubGroup, {
  foreignKey: 'groupId',
  as: 'subGroups'
});

HospitalSubGroup.belongsTo(HospitalGroup, {
  foreignKey: 'groupId',
  as: 'hospitalGroup'
});

// ======================
// 2. Associações do HospitalSubGroup
// ======================
HospitalSubGroup.hasMany(Hospital, {
  foreignKey: 'subGroupId',
  as: 'hospitals'
});

Hospital.belongsTo(HospitalSubGroup, {
  foreignKey: 'subGroupId',
  as: 'hospitalSubGroup'
});

// ======================
// 3. Associações do Hospital
// ======================
Hospital.hasMany(Sector, {
  foreignKey: 'hospitalId',
  as: 'sectors'
});

Hospital.hasMany(Failure, {
  foreignKey: 'hospitalId',
  as: 'failures'
});

// ======================
// 4. Associações do Sector
// ======================
Sector.belongsTo(Hospital, {
  foreignKey: 'hospitalId',
  as: 'hospital'
});

Sector.hasMany(Failure, {
  foreignKey: 'sectorId',
  as: 'failures'
});

// ======================
// 5. Associações do Professional
// ======================
Professional.hasMany(Failure, {
  foreignKey: 'professionalId',
  as: 'failures'
});

Professional.hasMany(Failure, {
  foreignKey: 'auditorId',
  as: 'audits'
});

// ======================
// 6. Associações do Patient
// ======================
Patient.hasMany(Internment, {
  foreignKey: 'patientId',
  as: 'internments'
});

Patient.hasMany(MedicalRecord, {
  foreignKey: 'patientId',
  as: 'medicalRecords'
});

// ======================
// 7. Associações do Internment
// ======================
Internment.belongsTo(Patient, {
  foreignKey: 'patientId',
  as: 'patient'
});

Internment.belongsTo(Sector, {
  foreignKey: 'dischargeSectorId',
  as: 'dischargeSector'
});

Internment.hasMany(Failure, {
  foreignKey: 'internmentId',
  as: 'failures'
});

// ======================
// 8. Associações do MedicalRecord
// ======================
MedicalRecord.belongsTo(Professional, {
  foreignKey: 'auditorId',
  as: 'auditor'
});

MedicalRecord.belongsTo(Sector, {
  foreignKey: 'auditorSectorId',
  as: 'auditorSector'
});

MedicalRecord.belongsTo(Patient, {
  foreignKey: 'patientId',
  as: 'patient'
});

MedicalRecord.belongsTo(Sector, {
  foreignKey: 'dischargeSectorId',
  as: 'dischargeSector'
});

MedicalRecord.hasMany(Failure, {
  foreignKey: 'medicalRecordId',
  as: 'failures'
});

// ======================
// 9. Associações do Failure
// ======================
Failure.belongsTo(Professional, {
  foreignKey: 'professionalId',
  as: 'professional'
});

Failure.belongsTo(Professional, {
  foreignKey: 'auditorId',
  as: 'auditor'
});

Failure.belongsTo(Form, {
  foreignKey: 'formId',
  as: 'form'
});

Failure.belongsTo(MedicalRecord, {
  foreignKey: 'medicalRecordId',
  as: 'medicalRecord'
});

Failure.belongsTo(Sector, {
  foreignKey: 'sectorReporterId',
  as: 'sectorReporter'
});

Failure.belongsTo(Sector, {
  foreignKey: 'sectorResponsibleId',
  as: 'sectorResponsible'
});

Failure.belongsTo(Hospital, {
  foreignKey: 'hospitalId',
  as: 'hospital'
});

// ======================
// 10. Associações Many-to-Many
// ======================
Failure.belongsToMany(InconsistencyType, {
  through: FailureInconsistencyType,
  foreignKey: 'failureId',
  otherKey: 'inconsistencyTypeId',
  as: 'inconsistencyTypes'
});

InconsistencyType.belongsToMany(Failure, {
  through: FailureInconsistencyType,
  foreignKey: 'inconsistencyTypeId',
  otherKey: 'failureId',
  as: 'failures'
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
  InconsistencyType,
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
