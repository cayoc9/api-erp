// controllers/hospitalController.js
const { Hospital, HospitalGroup, Sector } = require('../models');

// Obter todos os hospitais
exports.getAllHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.findAll({
      include: [
        { model: HospitalGroup, as: 'hospitalGroup' },
        { model: Sector, as: 'sectors' }
      ],
    });
    res.status(200).json(hospitals);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter os hospitais.', error });
  }
};

// Obter um hospital por ID
exports.getHospitalById = async (req, res) => {
  const { id } = req.params;
  try {
    const hospital = await Hospital.findByPk(id, {
      include: [
        { model: HospitalGroup, as: 'hospitalGroup' },
        { model: Sector, as: 'sectors' }
      ],
    });
    if (hospital) {
      res.status(200).json(hospital);
    } else {
      res.status(404).json({ message: 'Hospital não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter o hospital.', error });
  }
};

// Criar um novo hospital
exports.createHospital = async (req, res) => {
  const { name, groupId, createUser } = req.body;
  try {
    const newHospital = await Hospital.create({ name, groupId, createUser });
    res.status(201).json(newHospital);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar o hospital.', error });
  }
};

// Atualizar um hospital existente
exports.updateHospital = async (req, res) => {
  const { id } = req.params;
  const { name, groupId, updateUser } = req.body;
  try {
    const hospital = await Hospital.findByPk(id);
    if (hospital) {
      await hospital.update({ name, groupId, updateUser });
      res.status(200).json(hospital);
    } else {
      res.status(404).json({ message: 'Hospital não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o hospital.', error });
  }
};

// Deletar um hospital
exports.deleteHospital = async (req, res) => {
  const { id } = req.params;
  try {
    const hospital = await Hospital.findByPk(id);
    if (hospital) {
      await hospital.destroy();
      res.status(200).json({ message: 'Hospital deletado com sucesso.' });
    } else {
      res.status(404).json({ message: 'Hospital não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar o hospital.', error });
  }
};
