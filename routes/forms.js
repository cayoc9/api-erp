// routes/forms.js
const express = require('express');
const router = express.Router();
const FormController = require('../controllers/FormController');

// Rota para obter todos os forms
router.get('/', FormController.getAllForms);

// Rota para obter um form por ID
router.get('/:id', FormController.getFormById);

// Rota para criar um novo form
router.post('/', FormController.createForm);

// Rota para atualizar um form existente
router.put('/:id', FormController.updateForm);

// Rota para deletar um form
router.delete('/:id', FormController.deleteForm);

module.exports = router;
