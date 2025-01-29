/**
 * Rotas para gerenciar 'TPInconsistencies' (tipos de inconsistências).
 * Endpoints para listar, criar, atualizar e deletar.
 * Exemplo: /api/tp-inconsistencies
 */

const express = require('express');
const router = express.Router();
const InconsistencyTypeController = require('../controllers/InconsistencyTypeController');

/**
 * @swagger
 * components:
 *   schemas:
 *     InconsistencyType:
 *       type: object
 *       required:
 *         - description
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-gerado
 *         description:
 *           type: string
 *           maxLength: 100
 *           description: Descrição do tipo de inconsistência
 *         status:
 *           type: boolean
 *           description: Status de ativação (true=ativo)
 */

/**
 * @swagger
 * /api/tp-inconsistencies:
 *   get:
 *     summary: Lista todos os tipos de inconsistência
 *     tags: [Inconsistency Types]
 *     responses:
 *       200:
 *         description: Lista de tipos de inconsistência
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InconsistencyType'
 * 
 *   post:
 *     summary: Cria novo tipo de inconsistência
 *     tags: [Inconsistency Types]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InconsistencyType'
 *     responses:
 *       201:
 *         description: Tipo de inconsistência criado
 *       400:
 *         description: Dados inválidos
 */

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
