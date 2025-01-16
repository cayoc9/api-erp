/**
 * Rotas para gerenciar 'TPInconsistencies' (tipos de inconsistências).
 * Endpoints para listar, criar, atualizar e deletar.
 * Exemplo: /api/tp-inconsistencies
 */

const express = require('express');
const router = express.Router();
const tpInconsistenciesController = require('../controllers/TPInconsistenciesController');

// GET /api/tp-inconsistencies - Lista todas as inconsistências
router.get('/', tpInconsistenciesController.getAllTPInconsistencies);

// GET /api/tp-inconsistencies/:id - Detalhes de uma inconsistência
router.get('/:id', tpInconsistenciesController.getTPInconsistencyById);

// POST /api/tp-inconsistencies - Cria uma inconsistência
router.post('/', tpInconsistenciesController.createTPInconsistency);

// PUT /api/tp-inconsistencies/:id - Atualiza uma inconsistência
router.put('/:id', tpInconsistenciesController.updateTPInconsistency);

// DELETE /api/tp-inconsistencies/:id - Remove uma inconsistência
router.delete('/:id', tpInconsistenciesController.deleteTPInconsistency);

module.exports = router;
