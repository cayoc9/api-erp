const { Professional, Failure } = require('../models');
const csv = require('csv-parser');
const fs = require('fs');

exports.getAllProfessionals = async (req, res) => {
    try {
        const professionals = await Professional.findAll({
            include: [
                { model: Failure, as: 'failures' },
                { model: Failure, as: 'auditorias' }
            ]
        });
        res.status(200).json(professionals);
    } catch (error) {
        console.error('Erro ao obter profissionais:', error);
        res.status(500).json({ message: 'Erro ao obter profissionais.', error: error.message });
    }
};

exports.getProfessionalById = async (req, res) => {
    const { id } = req.params;
    try {
        const professional = await Professional.findByPk(id, {
            include: [
                { model: Failure, as: 'failures' },
                { model: Failure, as: 'auditorias' }
            ]
        });
        if (professional) {
            res.status(200).json(professional);
        } else {
            res.status(404).json({ message: 'Profissional não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao obter profissional:', error);
        res.status(500).json({ message: 'Erro ao obter profissional.', error: error.message });
    }
};

exports.createProfessional = async (req, res) => {
    const { name, role, tipo, origem, statusCnes, createUser } = req.body;
    try {
        const newProfessional = await Professional.create({
            name,
            role,
            tipo,
            origem: origem || 'interno',
            statusCnes: statusCnes || false,
            createUser
        });
        res.status(201).json(newProfessional);
    } catch (error) {
        console.error('Erro ao criar profissional:', error);
        res.status(500).json({ message: 'Erro ao criar profissional.', error: error.message });
    }
};

exports.updateProfessional = async (req, res) => {
    const { id } = req.params;
    const { name, role, tipo, origem, statusCnes, updateUser } = req.body;
    try {
        const professional = await Professional.findByPk(id);
        if (professional) {
            await professional.update({
                name,
                role,
                tipo,
                origem,
                statusCnes,
                updateUser,
                updateDate: new Date()
            });
            res.status(200).json(professional);
        } else {
            res.status(404).json({ message: 'Profissional não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao atualizar profissional:', error);
        res.status(500).json({ message: 'Erro ao atualizar profissional.', error: error.message });
    }
};

exports.deleteProfessional = async (req, res) => {
    const { id } = req.params;
    try {
        const professional = await Professional.findByPk(id);
        if (professional) {
            await professional.destroy();
            res.status(200).json({ message: 'Profissional deletado com sucesso.' });
        } else {
            res.status(404).json({ message: 'Profissional não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao deletar profissional:', error);
        res.status(500).json({ message: 'Erro ao deletar profissional.', error: error.message });
    }
};

exports.importFromCSV = async (req, res) => {
    if (!req.files || !req.files.file) {
        return res.status(400).json({ message: 'Nenhum arquivo CSV foi enviado.' });
    }

    const file = req.files.file;
    const tempPath = `/tmp/${file.name}`;

    try {
        // Salvar o arquivo temporariamente
        await file.mv(tempPath);

        const results = [];
        fs.createReadStream(tempPath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                try {
                    // Processar cada linha do CSV
                    for (const row of results) {
                        await Professional.create({
                            name: row.name,
                            role: row.role,
                            tipo: row.tipo || 'profissional',
                            origem: 'cnes',
                            statusCnes: true,
                            createUser: req.body.createUser
                        });
                    }

                    // Limpar o arquivo temporário
                    fs.unlinkSync(tempPath);

                    res.status(200).json({
                        message: `${results.length} profissionais importados com sucesso.`
                    });
                } catch (error) {
                    console.error('Erro ao processar CSV:', error);
                    res.status(500).json({
                        message: 'Erro ao processar arquivo CSV.',
                        error: error.message
                    });
                }
            });
    } catch (error) {
        console.error('Erro ao importar CSV:', error);
        res.status(500).json({
            message: 'Erro ao importar arquivo CSV.',
            error: error.message
        });
    }
}; 