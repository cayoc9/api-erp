const express = require('express');
const router = express.Router();
const controladorInternacao = require('../controllers/InternacaoController');

/**
 * @swagger
 * tags:
 *   name: Internações
 *   description: Gestão de internações hospitalares
 */

// Rota para obter todas as internações
router.get('/', controladorInternacao.obterTodasInternacoes);

// Rota para obter uma internação por ID
router.get('/:id', controladorInternacao.obterInternacaoPorId);

// Rota para criar uma nova internação
router.post('/', controladorInternacao.criarInternacao);

// Rota para atualizar uma internação existente
router.put('/:id', controladorInternacao.atualizarInternacao);

// Rota para deletar uma internação
router.delete('/:id', controladorInternacao.deletarInternacao);

module.exports = router; 