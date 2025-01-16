// routes/hospitals.js
const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/HospitalController');

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

module.exports = router;
