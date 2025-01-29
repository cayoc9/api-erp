const express = require('express');
const router = express.Router();
const internmentController = require('../controllers/InternmentController');

// Rota para obter todas as internações
router.get('/', internmentController.getAllInternments);

// Rota para obter uma internação por ID
router.get('/:id', internmentController.getInternmentById);

// Rota para criar uma nova internação
router.post('/', internmentController.createInternment);

// Rota para atualizar uma internação existente
router.put('/:id', internmentController.updateInternment);

// Rota para deletar uma internação
router.delete('/:id', internmentController.deleteInternment);

module.exports = router; 