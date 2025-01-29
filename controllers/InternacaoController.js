const { Internment, Patient, Sector } = require('../models');

exports.obterTodasInternacoes = async (req, res) => {
    try {
        const internacoes = await Internment.findAll({
            include: [
                { model: Patient, as: 'patient' },
                { model: Sector, as: 'dischargeSector' }
            ]
        });
        res.status(200).json(internacoes);
    } catch (erro) {
        res.status(500).json({
            mensagem: 'Erro ao buscar internações',
            erro: erro.message
        });
    }
};

exports.getInternmentById = async (req, res) => {
    const { id } = req.params;
    try {
        const internment = await Internment.findByPk(id, {
            include: [
                { model: Patient, as: 'patient' },
                { model: Sector, as: 'dischargeSector' }
            ]
        });
        if (internment) {
            res.status(200).json(internment);
        } else {
            res.status(404).json({ message: 'Internação não encontrada.' });
        }
    } catch (error) {
        console.error('Erro ao obter internação:', error);
        res.status(500).json({ message: 'Erro ao obter internação.', error: error.message });
    }
};

exports.createInternment = async (req, res) => {
    const { patientId, dataInternacao, dataAlta, setorAltaId, createUser } = req.body;
    try {
        const newInternment = await Internment.create({
            patientId,
            dataInternacao,
            dataAlta,
            setorAltaId,
            createUser
        });

        const internmentWithAssociations = await Internment.findByPk(newInternment.id, {
            include: [
                { model: Patient, as: 'patient' },
                { model: Sector, as: 'dischargeSector' }
            ]
        });

        res.status(201).json(internmentWithAssociations);
    } catch (error) {
        console.error('Erro ao criar internação:', error);
        res.status(500).json({ message: 'Erro ao criar internação.', error: error.message });
    }
};

exports.updateInternment = async (req, res) => {
    const { id } = req.params;
    const { dataInternacao, dataAlta, setorAltaId, updateUser } = req.body;
    try {
        const internment = await Internment.findByPk(id);
        if (internment) {
            await internment.update({
                dataInternacao,
                dataAlta,
                dischargeSectorId: setorAltaId,
                updateUser,
                updateDate: new Date()
            });

            const updatedInternment = await Internment.findByPk(id, {
                include: [
                    { model: Patient, as: 'patient' },
                    { model: Sector, as: 'dischargeSector' }
                ]
            });

            res.status(200).json(updatedInternment);
        } else {
            res.status(404).json({ message: 'Internação não encontrada.' });
        }
    } catch (error) {
        console.error('Erro ao atualizar internação:', error);
        res.status(500).json({ message: 'Erro ao atualizar internação.', error: error.message });
    }
};

exports.deleteInternment = async (req, res) => {
    const { id } = req.params;
    try {
        const internment = await Internment.findByPk(id);
        if (internment) {
            await internment.destroy();
            res.status(200).json({ message: 'Internação deletada com sucesso.' });
        } else {
            res.status(404).json({ message: 'Internação não encontrada.' });
        }
    } catch (error) {
        console.error('Erro ao deletar internação:', error);
        res.status(500).json({ message: 'Erro ao deletar internação.', error: error.message });
    }
}; 