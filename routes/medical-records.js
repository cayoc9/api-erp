const express = require('express');
const router = express.Router();
const medicalRecordController = require('../controllers/MedicalRecordController');

/**
 * @swagger
 * components:
 *   schemas:
 *     MedicalRecord:
 *       type: object
 *       required:
 *         - medicalRecordNumber
 *         - auditorId
 *         - auditorSectorId
 *         - auditDate
 *         - patientId
 *       properties:
 *         medicalRecordNumber:
 *           type: string
 *           description: Número do prontuário (pode ser repetido)
 *         auditorId:
 *           type: integer
 *           description: ID do auditor responsável
 *         auditorSectorId:
 *           type: integer
 *           description: ID do setor do auditor
 *         auditDate:
 *           type: string
 *           format: date-time
 *           description: Data e hora da auditoria
 *         patientId:
 *           type: integer
 *           description: ID do paciente
 *         admissionStartDate:
 *           type: string
 *           format: date
 *           description: Data de início da internação
 *         admissionEndDate:
 *           type: string
 *           format: date
 *           description: Data de alta da internação
 *         dischargeSectorId:
 *           type: integer
 *           description: ID do setor de alta
 * 
 *     Failure:
 *       type: object
 *       required:
 *         - description
 *         - formId
 *         - inconsistencyTypeId
 *       properties:
 *         description:
 *           type: string
 *           description: Descrição detalhada da falha
 *         formId:
 *           type: integer
 *           description: ID do formulário associado
 *         inconsistencyTypeId:
 *           type: integer
 *           description: ID do tipo de inconsistência
 */

/**
 * @swagger
 * /api/medical-records:
 *   post:
 *     summary: Cria novo prontuário com múltiplas falhas
 *     tags: [Medical Records]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               medicalRecordData:
 *                 $ref: '#/components/schemas/MedicalRecord'
 *               failures:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Failure'
 *             example:
 *               medicalRecordData:
 *                 medicalRecordNumber: "PRONT-2024-001"
 *                 auditorId: 5
 *                 auditorSectorId: 2
 *                 auditDate: "2024-03-15T14:30:00Z"
 *                 patientId: 42
 *                 admissionStartDate: "2024-03-10"
 *                 admissionEndDate: "2024-03-14"
 *                 dischargeSectorId: 3
 *               failures:
 *                 - description: "Medicação incorreta"
 *                   formId: 1
 *                   inconsistencyTypeId: 2
 *                 - description: "Procedimento tardio"
 *                   formId: 1
 *                   inconsistencyTypeId: 3
 *     responses:
 *       201:
 *         description: Prontuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 medicalRecord:
 *                   $ref: '#/components/schemas/MedicalRecord'
 *                 failures:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Failure'
 *       400:
 *         description: Erro de validação
 *       500:
 *         description: Erro interno do servidor
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