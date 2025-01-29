const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const medicalRecordSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  medicalRecordNumber: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'medical_record_number',
    unique: false
  },
  auditorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'auditor_id',
    references: {
      model: 'professionals',
      key: 'id'
    }
  },
  auditorSectorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'auditor_sector_id',
    references: {
      model: 'sectors',
      key: 'id'
    }
  },
  auditDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'audit_date'
  },
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'patient_id',
    references: {
      model: 'patients',
      key: 'id'
    }
  },
  dischargeSectorId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'discharge_sector_id',
    references: {
      model: 'sectors',
      key: 'id'
    }
  },
  admissionStartDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'admission_start_date'
  },
  admissionEndDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'admission_end_date',
    validate: {
      isAfterStartDate(value) {
        if (this.admissionStartDate && value && value < this.admissionStartDate) {
          throw new Error('End date must be after start date');
        }
      }
    }
  },
  createDate: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
    field: 'create_date'
  },
  createUser: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'create_user'
  },
  updateDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'update_date'
  },
  updateUser: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'update_user'
  }
};

class MedicalRecord extends Model {
  static associate(models) {
    MedicalRecord.belongsTo(models.Professional, {
      foreignKey: 'auditorId',
      as: 'auditor'
    });
    MedicalRecord.belongsTo(models.Sector, {
      foreignKey: 'auditorSectorId',
      as: 'auditorSector'
    });
    MedicalRecord.belongsTo(models.Patient, {
      foreignKey: 'patientId',
      as: 'patient'
    });
    MedicalRecord.belongsTo(models.Sector, {
      foreignKey: 'dischargeSectorId',
      as: 'dischargeSector'
    });
    MedicalRecord.hasMany(models.Failure, {
      foreignKey: 'medicalRecordId',
      as: 'failures'
    });
  }
}

MedicalRecord.init(medicalRecordSchema, {
  sequelize,
  modelName: 'MedicalRecord',
  tableName: 'medical_records',
  timestamps: false,
  underscored: true
});

module.exports = MedicalRecord; 