// controllers/ResponsibleController
const { Responsible, Failure } = require('../models');

// Obter todos os responsibles
exports.getAllResponsibles = async (req, res) => {
  try {
    const responsibles = await Responsible.findAll({
      include: [{
        model: Failure,
        as: 'failures',
        attributes: ['id', 'prontuarioCode', 'formularioId', 'formularioDate', 'professionalId', 'hospitalId', 'sectorId', 'status', 'observacoes', 'createDate', 'createUser', 'updateDate', 'updateUser']
      }]
    });
    res.status(200).json(responsibles);
  } catch (error) {
    console.error('Erro ao obter os responsibles:', error);
    res.status(500).json({ message: 'Erro ao obter os responsibles.', error });
  }
};

// Obter um responsible por ID
exports.getResponsibleById = async (req, res) => {
  const { id } = req.params;
  try {
    const responsible = await Responsible.findByPk(id, {
      include: [{ model: Failure, as: 'failures' }],
    });
    if (responsible) {
      res.status(200).json(responsible);
    } else {
      res.status(404).json({ message: 'Responsible não encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao obter o responsible:', error);
    res.status(500).json({ message: 'Erro ao obter o responsible.', error });
  }
};

// Criar um novo responsible
exports.createResponsible = async (req, res) => {
  const { name, createUser } = req.body;
  try {
    const newResponsible = await Responsible.create({ name, createUser });
    res.status(201).json(newResponsible);
  } catch (error) {
    console.error('Erro ao criar o responsible:', error);
    res.status(500).json({ message: 'Erro ao criar o responsible.', error });
  }
};

// Atualizar um responsible existente
exports.updateResponsible = async (req, res) => {
  const { id } = req.params;
  const { name, updateUser } = req.body;
  try {
    const responsible = await Responsible.findByPk(id);
    if (responsible) {
      await responsible.update({ name, updateUser });
      res.status(200).json(responsible);
    } else {
      res.status(404).json({ message: 'Responsible não encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao atualizar o responsible:', error);
    res.status(500).json({ message: 'Erro ao atualizar o responsible.', error });
  }
};

// Deletar um responsible
exports.deleteResponsible = async (req, res) => {
  const { id } = req.params;
  try {
    const responsible = await Responsible.findByPk(id);
    if (responsible) {
      await responsible.destroy();
      res.status(200).json({ message: 'Responsible deletado com sucesso.' });
    } else {
      res.status(404).json({ message: 'Responsible não encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao deletar o responsible:', error);
    res.status(500).json({ message: 'Erro ao deletar o responsible.', error });
  }
};
