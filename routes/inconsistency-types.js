/**
 * Rotas para gerenciar 'TPInconsistencies' (tipos de inconsistências).
 * Endpoints para listar, criar, atualizar e deletar.
 * Exemplo: /api/tp-inconsistencies
 */

const express = require('express');
const router = express.Router();
const InconsistencyTypeController = require('../controllers/InconsistencyTypeController');

// GET /api/tp-inconsistencies - Lista todas as inconsistências
router.get('/', InconsistencyTypeController.getAllInconsistencyTypes);

// GET /api/tp-inconsistencies/:id - Detalhes de uma inconsistência
router.get('/:id', InconsistencyTypeController.getInconsistencyTypeById);

// POST /api/tp-inconsistencies - Cria uma inconsistência
router.post('/', InconsistencyTypeController.createInconsistencyType);

// PUT /api/tp-inconsistencies/:id - Atualiza uma inconsistência
router.put('/:id', InconsistencyTypeController.updateInconsistencyType);

// DELETE /api/tp-inconsistencies/:id - Remove uma inconsistência
router.delete('/:id', InconsistencyTypeController.deleteInconsistencyType);

module.exports = router;
