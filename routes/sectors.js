// routes/sectors.js
const express = require('express');
const router = express.Router();
const sectorController = require('../controllers/SectorController.js');

/**
 * @swagger
 * tags:
 *   name: Sectors
 *   description: Gestão de setores hospitalares
 */

/**
 * @swagger
 * /api/sectors:
 *   get:
 *     summary: Lista todos os setores
 *     tags: [Sectors]
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
 *     tags: [Sectors]
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
 * /api/sectors/{id}:
 *   get:
 *     summary: Obtém setor por ID
 *     tags: [Sectors]
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
 *     tags: [Sectors]
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
 *     tags: [Sectors]
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
router.get('/', sectorController.getAllSectors);

// Rota para obter um setor por ID
router.get('/:id', sectorController.getSectorById);

// Rota para criar um novo setor
router.post('/', sectorController.createSector);

// Rota para atualizar um setor existente
router.put('/:id', sectorController.updateSector);

// Rota para deletar um setor
router.delete('/:id', sectorController.deleteSector);

module.exports = router;
