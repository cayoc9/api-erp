const { Patient } = require('../models');

exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.findAll();
        res.status(200).json(patients);
    } catch (error) {
        console.error('Erro ao obter pacientes:', error);
        res.status(500).json({ message: 'Erro ao obter pacientes.', error: error.message });
    }
};

exports.getPatientById = async (req, res) => {
    const { id } = req.params;
    try {
        const patient = await Patient.findByPk(id);
        if (patient) {
            res.status(200).json(patient);
        } else {
            res.status(404).json({ message: 'Paciente não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao obter paciente:', error);
        res.status(500).json({ message: 'Erro ao obter paciente.', error: error.message });
    }
};

exports.createPatient = async (req, res) => {
    const { nome, data_nascimento, createUser } = req.body;
    try {
        const newPatient = await Patient.create({
            nome,
            data_nascimento,
            createUser
        });
        res.status(201).json(newPatient);
    } catch (error) {
        console.error('Erro ao criar paciente:', error);
        res.status(500).json({ message: 'Erro ao criar paciente.', error: error.message });
    }
};

exports.updatePatient = async (req, res) => {
    const { id } = req.params;
    const { nome, data_nascimento, updateUser } = req.body;
    try {
        const patient = await Patient.findByPk(id);
        if (patient) {
            await patient.update({
                nome,
                data_nascimento,
                updateUser,
                updateDate: new Date()
            });
            res.status(200).json(patient);
        } else {
            res.status(404).json({ message: 'Paciente não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao atualizar paciente:', error);
        res.status(500).json({ message: 'Erro ao atualizar paciente.', error: error.message });
    }
};

exports.deletePatient = async (req, res) => {
    const { id } = req.params;
    try {
        const patient = await Patient.findByPk(id);
        if (patient) {
            await patient.destroy();
            res.status(200).json({ message: 'Paciente deletado com sucesso.' });
        } else {
            res.status(404).json({ message: 'Paciente não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao deletar paciente:', error);
        res.status(500).json({ message: 'Erro ao deletar paciente.', error: error.message });
    }
}; 