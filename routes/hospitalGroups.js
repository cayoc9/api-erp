/**
 * @swagger
 * tags:
 *   name: Hospital Groups
 *   description: Gestão de grupos hospitalares
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     HospitalGroup:
 *       type: object
 *       required:
 *         - description
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-gerado
 *         description:
 *           type: string
 *           maxLength: 20
 *         subGroups:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/HospitalSubGroup'
 */

/**
 * @swagger
 * /api/hospital-groups:
 *   get:
 *     summary: Lista grupos com subgrupos
 *     tags: [Hospital Groups]
 *     responses:
 *       200:
 *         description: Lista de grupos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HospitalGroup'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *
 *   post:
 *     summary: Cria novo grupo
 *     tags: [Hospital Groups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HospitalGroup'
 *     responses:
 *       201:
 *         description: Grupo criado
 *       400:
 *         description: Dados inválidos
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

// Documentação similar para endpoints individuais 