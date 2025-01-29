// controllers/indicatorController.js
const { Indicator } = require('../models');

// Obter todos os indicators
exports.getAllIndicators = async (req, res) => {
  try {
    const indicators = await Indicator.findAll();
    res.status(200).json(indicators);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter os indicadores.', error });
  }
};

// Obter um indicator por ID
exports.getIndicatorById = async (req, res) => {
  const { id } = req.params;
  try {
    const indicator = await Indicator.findByPk(id);
    if (indicator) {
      res.status(200).json(indicator);
    } else {
      res.status(404).json({ message: 'Indicador não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter o indicador.', error });
  }
};

// Criar um novo indicator
exports.createIndicator = async (req, res) => {
  const { name, value, description, status, createUser } = req.body;
  try {
    const newIndicator = await Indicator.create({ name, value, description, status, createUser });
    res.status(201).json(newIndicator);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar o indicador.', error });
  }
};

// Atualizar um indicator existente
exports.updateIndicator = async (req, res) => {
  const { id } = req.params;
  const { name, value, description, status, updateUser } = req.body;
  try {
    const indicator = await Indicator.findByPk(id);
    if (indicator) {
      await indicator.update({ name, value, description, status, updateUser });
      res.status(200).json(indicator);
    } else {
      res.status(404).json({ message: 'Indicador não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o indicador.', error });
  }
};

// Deletar um indicator
exports.deleteIndicator = async (req, res) => {
  const { id } = req.params;
  try {
    const indicator = await Indicator.findByPk(id);
    if (indicator) {
      await indicator.destroy();
      res.status(200).json({ message: 'Indicador deletado com sucesso.' });
    } else {
      res.status(404).json({ message: 'Indicador não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar o indicador.', error });
  }
};
