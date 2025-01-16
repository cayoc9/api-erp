// routes/indicators.js
const express = require('express');
const router = express.Router();
const indicatorController = require('../controllers/IndicatorController');

// Rota para obter todos os indicators
router.get('/', indicatorController.getAllIndicators);

// Rota para obter um indicator por ID
router.get('/:id', indicatorController.getIndicatorById);

// Rota para criar um novo indicator
router.post('/', indicatorController.createIndicator);

// Rota para atualizar um indicator existente
router.put('/:id', indicatorController.updateIndicator);

// Rota para deletar um indicator
router.delete('/:id', indicatorController.deleteIndicator);

module.exports = router;
