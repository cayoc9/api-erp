// models/Failure.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const failureSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  medicalRecordId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'medical_record_id',
    references: {
      model: 'medical_records',
      key: 'id'
    }
  },
  medicalRecordCode: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'medical_record_code'
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
  internmentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'internment_id',
    references: {
      model: 'internments',
      key: 'id'
    }
  },
  formId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'form_id'
  },
  formDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'form_date',
    validate: {
      isWithinAdmissionPeriod() {
        if (this.medicalRecord && this.formDate) {
          const { admissionStartDate, admissionEndDate } = this.medicalRecord;
          if (admissionStartDate && this.formDate < admissionStartDate) {
            throw new Error('Form date must be after admission start date');
          }
          if (admissionEndDate && this.formDate > admissionEndDate) {
            throw new Error('Form date must be before admission end date');
          }
        }
      }
    }
  },
  professionalId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'professional_id',
    references: {
      model: 'professionals',
      key: 'id'
    }
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
  hospitalId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'hospitals',
      key: 'id'
    },
    field: 'hospital_id'
  },
  sectorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'sector_id'
  },
  status: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  createDate: {
    type: DataTypes.DATE,
    allowNull: true,
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
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  resolvedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'resolved_at'
  },
  reportingSectorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'reporting_sector_id'
  },
  responsibleSectorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'responsible_sector_id'
  },
  inconsistencyTypeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'inconsistency_type_id',
    references: {
      model: 'inconsistency_types',
      key: 'id'
    }
  }
};

const Failure = sequelize.define('Failure', failureSchema, {
  tableName: 'failures',
  timestamps: true,
  createdAt: 'createDate',
  updatedAt: 'updateDate',
  underscored: true,
  freezeTableName: true
});

Failure.associate = (models) => {
  Failure.belongsTo(models.Professional, {
    foreignKey: 'professionalId',
    as: 'professional'
  });

  Failure.belongsTo(models.Patient, {
    foreignKey: 'patientId',
    as: 'patient'
  });

  Failure.belongsTo(models.Internment, {
    foreignKey: 'internmentId',
    as: 'internment'
  });

  Failure.belongsTo(models.MedicalRecord, {
    foreignKey: 'medicalRecordId',
    as: 'medicalRecord'
  });

  Failure.belongsTo(models.Hospital, {
    foreignKey: 'hospitalId',
    as: 'hospital'
  });

  Failure.belongsTo(models.Form, {
    foreignKey: 'formId',
    as: 'form'
  });

  Failure.belongsTo(models.InconsistencyType, {
    foreignKey: 'inconsistencyTypeId',
    as: 'inconsistencyType'
  });
};

module.exports = Failure;
