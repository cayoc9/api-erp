// routes/falhas.js
const express = require('express');
const router = express.Router();
const controladorFalha = require('../controllers/FalhaController');

/**
 * @swagger
 * tags:
 *   name: Falhas
 *   description: Gestão de falhas e inconsistências
 */

/**
 * @swagger
 * /api/falhas:
 *   get:
 *     summary: Lista todas as falhas
 *     tags: [Falhas]
 *     responses:
 *       200:
 *         description: Lista de falhas obtida com sucesso
 *       500:
 *         $ref: '#/components/responses/ErroServidor'
 * 
 *   post:
 *     summary: Cria nova falha
 *     tags: [Falhas]
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
router.get('/', controladorFalha.obterTodasFalhas);

// Rota para obter uma falha por ID
router.get('/:id', controladorFalha.obterFalhaPorId);

// Rota para criar uma nova falha
router.post('/', controladorFalha.criarFalha);

// Rota para atualizar uma falha existente
router.put('/:id', controladorFalha.atualizarFalha);

// Rota para deletar uma falha
router.delete('/:id', controladorFalha.deletarFalha);

module.exports = router;
