// routes/failures.js
const express = require('express');
const router = express.Router();
const failureController = require('../controllers/FailureController');

/**
 * @swagger
 * tags:
 *   name: Failures
 *   description: Gestão de falhas e inconsistências
 */

/**
 * @swagger
 * /api/failures:
 *   get:
 *     summary: Lista falhas com relacionamentos
 *     tags: [Failures]
 *     responses:
 *       200:
 *         description: Lista de falhas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Failure'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 * 
 *   post:
 *     summary: Cria nova falha
 *     tags: [Failures]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Failure'
 *     responses:
 *       201:
 *         description: Falha criada
 *       400:
 *         description: Dados inválidos
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

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
