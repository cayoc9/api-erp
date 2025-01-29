// routes/setores.js
const express = require('express');
const router = express.Router();
const controladorSetor = require('../controllers/SetorController');

/**
 * @swagger
 * tags:
 *   name: Setores
 *   description: Gestão de setores hospitalares
 */

/**
 * @swagger
 * /api/setores:
 *   get:
 *     summary: Lista todos os setores
 *     tags: [Setores]
 *     responses:
 *       200:
 *         description: Lista de setores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sector'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 * 
 *   post:
 *     summary: Cria novo setor
 *     tags: [Setores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sector'
 *     responses:
 *       201:
 *         description: Setor criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /api/setores/{id}:
 *   get:
 *     summary: Obtém setor por ID
 *     tags: [Setores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes do setor
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 * 
 *   put:
 *     summary: Atualiza setor existente
 *     tags: [Setores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sector'
 *     responses:
 *       200:
 *         description: Setor atualizado
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 * 
 *   delete:
 *     summary: Remove setor
 *     tags: [Setores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Setor removido
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

// Rota para obter todos os setores
router.get('/', controladorSetor.obterTodosSetores);

// Rota para obter um setor por ID
router.get('/:id', controladorSetor.obterSetorPorId);

// Rota para criar um novo setor
router.post('/', controladorSetor.criarSetor);

// Rota para atualizar um setor existente
router.put('/:id', controladorSetor.atualizarSetor);

// Rota para deletar um setor
router.delete('/:id', controladorSetor.deletarSetor);

module.exports = router;
