/**
 * @swagger
 * components:
 *   schemas:
 *     Sector:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         hospitalId:
 *           type: integer
 * 
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
 * 
 *     ServerError:
 *       description: Erro interno
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