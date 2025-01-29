/**
 * Rotas para gerenciar 'TPInconsistencies' (tipos de inconsistências).
 * Endpoints para listar, criar, atualizar e deletar.
 * Exemplo: /api/tp-inconsistencies
 */

const express = require('express');
const router = express.Router();
const controladorTipoInconsistencia = require('../controllers/TipoInconsistenciaController');

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
 * tags:
 *   name: Tipos de Inconsistência
 *   description: Gestão de tipos de inconsistências
 */

/**
 * @swagger
 * /api/tp-inconsistencies:
 *   get:
 *     summary: Lista todos os tipos de inconsistência
 *     tags: [Tipos de Inconsistência]
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
 *     tags: [Tipos de Inconsistência]
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
router.get('/', controladorTipoInconsistencia.obterTodosTipos);

// GET /api/tp-inconsistencies/:id - Detalhes de uma inconsistência
router.get('/:id', controladorTipoInconsistencia.obterTipoPorId);

// POST /api/tp-inconsistencies - Cria uma inconsistência
router.post('/', controladorTipoInconsistencia.criarTipo);

// PUT /api/tp-inconsistencies/:id - Atualiza uma inconsistência
router.put('/:id', controladorTipoInconsistencia.atualizarTipo);

// DELETE /api/tp-inconsistencies/:id - Remove uma inconsistência
router.delete('/:id', controladorTipoInconsistencia.deletarTipo);

module.exports = router;
