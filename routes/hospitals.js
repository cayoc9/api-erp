// routes/hospitals.js
const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/HospitalController');

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
