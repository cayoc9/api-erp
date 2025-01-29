// controllers/SectorController.js
const { Sector, Hospital } = require('../models');

// Obter todos os setores
exports.getAllSectors = async (req, res) => {
  try {
    const sectors = await Sector.findAll({
      include: [{ model: Hospital, as: 'hospital' }],
    });
    res.status(200).json(sectors);
  } catch (error) {
    console.error('Erro ao obter os setores:', error);
    res.status(500).json({ message: 'Erro ao obter os setores.', error });
  }
};

// Obter um setor por ID
exports.getSectorById = async (req, res) => {
  const { id } = req.params;
  try {
    const sector = await Sector.findByPk(id, {
      include: [{ model: Hospital, as: 'hospital' }],
    });
    if (sector) {
      res.status(200).json(sector);
    } else {
      res.status(404).json({ message: 'Setor não encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao obter o setor:', error);
    res.status(500).json({ message: 'Erro ao obter o setor.', error });
  }
};

// Criar um novo setor
exports.createSector = async (req, res) => {
  const { name, hospitalId, createUser } = req.body;
  try {
    const newSector = await Sector.create({ name, hospitalId, createUser });
    res.status(201).json(newSector);
  } catch (error) {
    console.error('Erro ao criar o setor:', error);
    res.status(500).json({ message: 'Erro ao criar o setor.', error });
  }
};

// Atualizar um setor existente
exports.updateSector = async (req, res) => {
  const { id } = req.params;
  const { name, hospitalId, updateUser } = req.body;
  try {
    const sector = await Sector.findByPk(id);
    if (sector) {
      await sector.update({ name, hospitalId, updateUser });
      res.status(200).json(sector);
    } else {
      res.status(404).json({ message: 'Setor não encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao atualizar o setor:', error);
    res.status(500).json({ message: 'Erro ao atualizar o setor.', error });
  }
};

// Deletar um setor
exports.deleteSector = async (req, res) => {
  const { id } = req.params;
  try {
    const sector = await Sector.findByPk(id);
    if (sector) {
      await sector.destroy();
      res.status(200).json({ message: 'Setor deletado com sucesso.' });
    } else {
      res.status(404).json({ message: 'Setor não encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao deletar o setor:', error);
    res.status(500).json({ message: 'Erro ao deletar o setor.', error });
  }
};
