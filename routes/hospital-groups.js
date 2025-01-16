// routes/hospital-groups.js
const express = require('express');
const router = express.Router();
const hospitalGroupController = require('../controllers/hospitalGroupController');

// Rota para obter todos os grupos hospitalares
router.get('/', hospitalGroupController.getAllHospitalGroups);

// Rota para obter um grupo hospitalar por ID
router.get('/:id', hospitalGroupController.getHospitalGroupById);

// Rota para criar um novo grupo hospitalar
router.post('/', hospitalGroupController.createHospitalGroup);

// Rota para atualizar um grupo hospitalar existente
router.put('/:id', hospitalGroupController.updateHospitalGroup);

// Rota para deletar um grupo hospitalar
router.delete('/:id', hospitalGroupController.deleteHospitalGroup);

module.exports = router;
