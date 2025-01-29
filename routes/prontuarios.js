const express = require('express');
const router = express.Router();
const controladorProntuario = require('../controllers/ProntuarioController');

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
 * /api/prontuarios:
 *   get:
 *     summary: Lista todos os prontuários
 *     tags: [Prontuários]
 *     responses:
 *       200:
 *         description: Lista de prontuários obtida com sucesso
 *       500:
 *         $ref: '#/components/responses/ErroServidor'
 */
router.get('/', controladorProntuario.obterTodosProntuarios);

/**
 * @swagger
 * /api/prontuarios/{id}:
 *   get:
 *     summary: Buscar prontuário por ID
 *     tags: [Prontuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.get('/:id', controladorProntuario.obterProntuarioPorId);

/**
 * @swagger
 * /api/prontuarios:
 *   post:
 *     summary: Cria novo prontuário com múltiplas falhas
 *     tags: [Prontuários]
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
router.post('/', controladorProntuario.criarProntuario);

/**
 * @swagger
 * /api/prontuarios/{id}:
 *   put:
 *     summary: Atualizar prontuário
 *     tags: [Prontuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.put('/:id', controladorProntuario.atualizarProntuario);

/**
 * @swagger
 * /api/prontuarios/{id}:
 *   delete:
 *     summary: Remover prontuário
 *     tags: [Prontuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.delete('/:id', controladorProntuario.deletarProntuario);

/**
 * @swagger
 * /api/prontuarios/{id}/failures:
 *   post:
 *     summary: Adicionar novas falhas ao prontuário
 *     tags: [Prontuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.post('/:id/failures', controladorProntuario.adicionarFalhas);

/**
 * @swagger
 * /api/prontuarios/{id}/failures/{failureId}:
 *   delete:
 *     summary: Remover falha do prontuário
 *     tags: [Prontuários]
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
router.delete('/:id/failures/:failureId', controladorProntuario.removerFalha);

module.exports = router; 