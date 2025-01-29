const { MedicalRecord, Professional, Sector, Patient, Failure, InconsistencyType, Form, sequelize } = require('../models');

const validateMedicalRecord = async (data) => {
    // Validar número único
    const existingRecord = await MedicalRecord.findOne({
        where: { medicalRecordNumber: data.medicalRecordNumber }
    });
    if (existingRecord) {
        throw new Error('Número de prontuário já existe');
    }

    // Validar tipo do auditor
    const auditor = await Professional.findByPk(data.auditorId);
    if (!auditor || auditor.type !== 'auditor') {
        throw new Error('Profissional deve ser do tipo auditor');
    }

    // Validar setor do auditor
    const auditorSector = await Sector.findByPk(data.auditorSectorId);
    if (!auditorSector) {
        throw new Error('Setor do auditor não encontrado');
    }

    // Validar datas
    if (data.admissionStartDate && data.admissionEndDate) {
        if (new Date(data.admissionEndDate) < new Date(data.admissionStartDate)) {
            throw new Error('Data de fim deve ser posterior à data de início');
        }
    }
};

const validateFailure = async (data, medicalRecord) => {
    // Validar formulário
    const form = await Form.findByPk(data.formularioId);
    if (!form) {
        throw new Error('Formulário não encontrado');
    }

    // Validar profissional
    const professional = await Professional.findByPk(data.professionalId);
    if (!professional || professional.type !== 'profissional') {
        throw new Error('Profissional responsável deve ser do tipo profissional');
    }

    // Validar setor
    const sector = await Sector.findByPk(data.sectorResponsibleId);
    if (!sector) {
        throw new Error('Setor responsável não encontrado');
    }

    // Validar data do formulário
    if (data.formularioDate) {
        const formDate = new Date(data.formularioDate);
        if (medicalRecord.admissionStartDate && formDate < new Date(medicalRecord.admissionStartDate)) {
            throw new Error('Data do formulário deve ser posterior à data de início da internação');
        }
        if (medicalRecord.admissionEndDate && formDate > new Date(medicalRecord.admissionEndDate)) {
            throw new Error('Data do formulário deve ser anterior à data de fim da internação');
        }
    }

    // Validar inconsistências
    if (!data.tpInconsistenciaIds || data.tpInconsistenciaIds.length === 0) {
        throw new Error('Pelo menos uma inconsistência deve ser informada');
    }

    const inconsistencies = await InconsistencyType.findAll({
        where: { id: data.tpInconsistenciaIds }
    });
    if (inconsistencies.length !== data.tpInconsistenciaIds.length) {
        throw new Error('Uma ou mais inconsistências não foram encontradas');
    }
};

exports.create = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { failures, ...medicalRecordData } = req.body;

        // Validar dados do prontuário
        await validateMedicalRecord(medicalRecordData);

        // Criar prontuário
        const medicalRecord = await MedicalRecord.create(medicalRecordData, { transaction });

        // Validar e criar falhas
        if (failures && failures.length > 0) {
            for (const failureData of failures) {
                await validateFailure(failureData, medicalRecord);

                const failure = await Failure.create({
                    ...failureData,
                    medicalRecordId: medicalRecord.id
                }, { transaction });

                // Associar inconsistências
                await failure.setTpInconsistencies(failureData.tpInconsistenciaIds, { transaction });
            }
        }

        await transaction.commit();

        // Buscar prontuário com todas as associações
        const result = await MedicalRecord.findByPk(medicalRecord.id, {
            include: [
                { model: Professional, as: 'auditor' },
                { model: Sector, as: 'auditorSector' },
                { model: Patient, as: 'patient' },
                { model: Sector, as: 'dischargeSector' },
                {
                    model: Failure,
                    as: 'failures',
                    include: [
                        { model: Professional, as: 'professional' },
                        { model: Sector, as: 'sector' },
                        { model: Form, as: 'formulario' },
                        { model: InconsistencyType, as: 'tpInconsistencies' }
                    ]
                }
            ]
        });

        res.status(201).json(result);
    } catch (error) {
        await transaction.rollback();
        console.error('Erro ao criar prontuário:', error);
        res.status(400).json({ message: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const medicalRecord = await MedicalRecord.findByPk(req.params.id, {
            include: [
                { model: Professional, as: 'auditor' },
                { model: Sector, as: 'auditorSector' },
                { model: Patient, as: 'patient' },
                { model: Sector, as: 'dischargeSector' },
                {
                    model: Failure,
                    as: 'failures',
                    include: [
                        { model: Professional, as: 'professional' },
                        { model: Sector, as: 'sector' },
                        { model: Form, as: 'formulario' },
                        { model: InconsistencyType, as: 'tpInconsistencies' }
                    ]
                }
            ]
        });

        if (!medicalRecord) {
            return res.status(404).json({ message: 'Prontuário não encontrado' });
        }

        res.json(medicalRecord);
    } catch (error) {
        console.error('Erro ao buscar prontuário:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const medicalRecord = await MedicalRecord.findByPk(req.params.id);
        if (!medicalRecord) {
            return res.status(404).json({ message: 'Prontuário não encontrado' });
        }

        const { failures, ...updateData } = req.body;

        // Atualizar dados do prontuário
        await medicalRecord.update(updateData, { transaction });

        // Se houver novas falhas, adicionar
        if (failures && failures.length > 0) {
            for (const failureData of failures) {
                await validateFailure(failureData, medicalRecord);

                const failure = await Failure.create({
                    ...failureData,
                    medicalRecordId: medicalRecord.id
                }, { transaction });

                await failure.setTpInconsistencies(failureData.tpInconsistenciaIds, { transaction });
            }
        }

        await transaction.commit();

        // Buscar prontuário atualizado com todas as associações
        const result = await MedicalRecord.findByPk(medicalRecord.id, {
            include: [
                { model: Professional, as: 'auditor' },
                { model: Sector, as: 'auditorSector' },
                { model: Patient, as: 'patient' },
                { model: Sector, as: 'dischargeSector' },
                {
                    model: Failure,
                    as: 'failures',
                    include: [
                        { model: Professional, as: 'professional' },
                        { model: Sector, as: 'sector' },
                        { model: Form, as: 'formulario' },
                        { model: InconsistencyType, as: 'tpInconsistencies' }
                    ]
                }
            ]
        });

        res.json(result);
    } catch (error) {
        await transaction.rollback();
        console.error('Erro ao atualizar prontuário:', error);
        res.status(400).json({ message: error.message });
    }
};

exports.addFailures = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const medicalRecord = await MedicalRecord.findByPk(req.params.id);
        if (!medicalRecord) {
            return res.status(404).json({ message: 'Prontuário não encontrado' });
        }

        const failures = req.body;
        const createdFailures = [];

        for (const failureData of failures) {
            await validateFailure(failureData, medicalRecord);

            const failure = await Failure.create({
                ...failureData,
                medicalRecordId: medicalRecord.id
            }, { transaction });

            await failure.setTpInconsistencies(failureData.tpInconsistenciaIds, { transaction });
            createdFailures.push(failure);
        }

        await transaction.commit();

        // Buscar falhas criadas com todas as associações
        const result = await Failure.findAll({
            where: { id: createdFailures.map(f => f.id) },
            include: [
                { model: Professional, as: 'professional' },
                { model: Sector, as: 'sector' },
                { model: Form, as: 'formulario' },
                { model: InconsistencyType, as: 'tpInconsistencies' }
            ]
        });

        res.status(201).json(result);
    } catch (error) {
        await transaction.rollback();
        console.error('Erro ao adicionar falhas:', error);
        res.status(400).json({ message: error.message });
    }
};

exports.removeFailure = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { id, failureId } = req.params;

        const failure = await Failure.findOne({
            where: {
                id: failureId,
                medicalRecordId: id
            }
        });

        if (!failure) {
            return res.status(404).json({ message: 'Falha não encontrada no prontuário' });
        }

        await failure.destroy({ transaction });
        await transaction.commit();

        res.status(200).json({ message: 'Falha removida com sucesso' });
    } catch (error) {
        await transaction.rollback();
        console.error('Erro ao remover falha:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.createMedicalRecordWithFailures = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { medicalRecordData, failures } = req.body;

        // 1. Criar MedicalRecord
        const newMedicalRecord = await MedicalRecord.create(medicalRecordData, { transaction });

        // 2. Criar Failures associadas
        const createdFailures = await Promise.all(
            failures.map(failure => Failure.create({
                ...failure,
                medicalRecordId: newMedicalRecord.id
            }, { transaction }))
        );

        await transaction.commit();
        res.status(201).json({
            medicalRecord: newMedicalRecord,
            failures: createdFailures
        });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ error: error.message });
    }
}; 