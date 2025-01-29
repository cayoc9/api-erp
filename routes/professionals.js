const express = require('express');
const router = express.Router();
const ProfessionalController = require('../controllers/ProfessionalController');

// Rota para obter todos os profissionais
router.get('/', ProfessionalController.getAllProfessionals);

// Rota para obter um profissional por ID
router.get('/:id', ProfessionalController.getProfessionalById);

// Rota para criar um novo profissional
router.post('/', ProfessionalController.createProfessional);

// Rota para importar profissionais via CSV
router.post('/import-csv', ProfessionalController.importFromCSV);

// Rota para atualizar um profissional existente
router.put('/:id', ProfessionalController.updateProfessional);

// Rota para deletar um profissional
router.delete('/:id', ProfessionalController.deleteProfessional);

module.exports = router; 