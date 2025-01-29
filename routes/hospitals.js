// routes/hospitals.js
const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/HospitalController');

/**
 * @swagger
 * tags:
 *   name: Hospitals
 *   description: Gestão de hospitais
 */

/**
 * @swagger
 * components:
 *   responses:
 *     NotFoundError:
 *       description: Recurso não encontrado
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Hospital não encontrado"
 * 
 *     ServerError:
 *       description: Erro interno do servidor
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *               error:
 *                 type: string
 *   schemas:
 *     Hospital:
 *       type: object
 *       required:
 *         - name
 *         - groupId
 *         - subGroupId
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-gerado
 *         name:
 *           type: string
 *           maxLength: 60
 *         groupId:
 *           type: integer
 *           description: ID do grupo hospitalar
 *         subGroupId:
 *           type: integer
 *           description: ID do subgrupo
 *         address:
 *           type: string
 *           maxLength: 255
 */

/**
 * @swagger
 * /api/hospitals:
 *   get:
 *     summary: Lista todos os hospitais
 *     tags: [Hospitals]
 *     responses:
 *       200:
 *         description: Lista de hospitais
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Hospital'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 * 
 *   post:
 *     summary: Cria novo hospital
 *     tags: [Hospitals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hospital'
 *     responses:
 *       201:
 *         description: Hospital criado
 *       400:
 *         description: Dados inválidos
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

// Rota para obter todos os hospitais
router.get('/', hospitalController.getAllHospitals);

// Rota para obter um hospital por ID
router.get('/:id', hospitalController.getHospitalById);

// Rota para criar um novo hospital
router.post('/', hospitalController.createHospital);

// Rota para atualizar um hospital existente
router.put('/:id', hospitalController.updateHospital);

// Rota para deletar um hospital
router.delete('/:id', hospitalController.deleteHospital);

/**
 * @swagger
 * /api/hospitals/{id}:
 *   get:
 *     responses:
 *       200:
 *         description: Hospital encontrado
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

module.exports = router;
