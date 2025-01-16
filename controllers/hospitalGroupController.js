// controllers/hospitalGroupController.js
const { HospitalGroup, Hospital } = require('../models');

// Obter todos os grupos hospitalares
exports.getAllHospitalGroups = async (req, res) => {
  try {
    const hospitalGroups = await HospitalGroup.findAll({
      include: [{ model: Hospital, as: 'hospitals' }],
    });
    res.status(200).json(hospitalGroups);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter os grupos hospitalares.', error });
  }
};

// Obter um grupo hospitalar por ID
exports.getHospitalGroupById = async (req, res) => {
  const { id } = req.params;
  try {
    const hospitalGroup = await HospitalGroup.findByPk(id, {
      include: [{ model: Hospital, as: 'hospitals' }],
    });
    if (hospitalGroup) {
      res.status(200).json(hospitalGroup);
    } else {
      res.status(404).json({ message: 'Grupo hospitalar não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter o grupo hospitalar.', error });
  }
};

// Criar um novo grupo hospitalar
exports.createHospitalGroup = async (req, res) => {
  const { description, createUser } = req.body;
  try {
    const newHospitalGroup = await HospitalGroup.create({ description, createUser });
    res.status(201).json(newHospitalGroup);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar o grupo hospitalar.', error });
  }
};

// Atualizar um grupo hospitalar existente
exports.updateHospitalGroup = async (req, res) => {
  const { id } = req.params;
  const { description, updateUser } = req.body;
  try {
    const hospitalGroup = await HospitalGroup.findByPk(id);
    if (hospitalGroup) {
      await hospitalGroup.update({ description, updateUser });
      res.status(200).json(hospitalGroup);
    } else {
      res.status(404).json({ message: 'Grupo hospitalar não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o grupo hospitalar.', error });
  }
};

// Deletar um grupo hospitalar
exports.deleteHospitalGroup = async (req, res) => {
  const { id } = req.params;
  try {
    const hospitalGroup = await HospitalGroup.findByPk(id);
    if (hospitalGroup) {
      await hospitalGroup.destroy();
      res.status(200).json({ message: 'Grupo hospitalar deletado com sucesso.' });
    } else {
      res.status(404).json({ message: 'Grupo hospitalar não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar o grupo hospitalar.', error });
  }
};
