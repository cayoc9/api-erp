const express = require('express');
const router = express.Router();
const medicalRecordController = require('../controllers/MedicalRecordController');

/**
 * @swagger
 * /api/medical-records:
 *   post:
 *     summary: Criar novo prontuário com falhas
 *     tags: [Medical Records]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - recordNumber
 *               - auditorId
 *               - auditorSectorId
 *               - auditDate
 *               - patientId
 *             properties:
 *               recordNumber:
 *                 type: string
 *               auditorId:
 *                 type: integer
 *               auditorSectorId:
 *                 type: integer
 *               auditDate:
 *                 type: string
 *                 format: date
 *               patientId:
 *                 type: integer
 *               failures:
 *                 type: array
 *                 items:
 *                   type: object
 */
router.post('/', medicalRecordController.createMedicalRecordWithFailures);

/**
 * @swagger
 * /api/medical-records/{id}:
 *   get:
 *     summary: Buscar prontuário por ID
 *     tags: [Medical Records]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.get('/:id', medicalRecordController.getById);

/**
 * @swagger
 * /api/medical-records/{id}:
 *   put:
 *     summary: Atualizar prontuário
 *     tags: [Medical Records]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.put('/:id', medicalRecordController.update);

/**
 * @swagger
 * /api/medical-records/{id}/failures:
 *   post:
 *     summary: Adicionar novas falhas ao prontuário
 *     tags: [Medical Records]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.post('/:id/failures', medicalRecordController.addFailures);

/**
 * @swagger
 * /api/medical-records/{id}/failures/{failureId}:
 *   delete:
 *     summary: Remover falha do prontuário
 *     tags: [Medical Records]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: failureId
 *         required: true
 *         schema:
 *           type: integer
 */
router.delete('/:id/failures/:failureId', medicalRecordController.removeFailure);

module.exports = router; 