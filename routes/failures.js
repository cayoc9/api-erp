// routes/failures.js
const express = require('express');
const router = express.Router();
const failureController = require('../controllers/FailureController');

// Rota para obter todas as falhas
router.get('/', failureController.getAllFailures);

// Rota para obter uma falha por ID
router.get('/:id', failureController.getFailureById);

// Rota para criar uma nova falha
router.post('/', failureController.createFailure);

// Rota para atualizar uma falha existente
router.put('/:id', failureController.updateFailure);

// Rota para deletar uma falha
router.delete('/:id', failureController.deleteFailure);

module.exports = router;
