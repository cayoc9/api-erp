/**
 * Rotas para gerenciar 'Responsibles' (Profissionais responsáveis).
 * Disponibiliza endpoints para listar, criar, atualizar e deletar registros.
 */

const express = require('express');
const router = express.Router();
const ResponsibleController = require('../controllers/ResponsibleController.js');

// GET /api/responsibles - Lista todos os profissionais
router.get('/', ResponsibleController.getAllResponsibles);

// GET /api/responsibles/:id - Detalhes de um profissional específico
router.get('/:id', ResponsibleController.getResponsibleById);

// POST /api/responsibles - Cria um novo profissional
router.post('/', ResponsibleController.createResponsible);

// PUT /api/responsibles/:id - Atualiza dados de um profissional
router.put('/:id', ResponsibleController.updateResponsible);

// DELETE /api/responsibles/:id - Remove um profissional
router.delete('/:id', ResponsibleController.deleteResponsible);

module.exports = router;
