const express = require('express');
const router = express.Router();
const patientController = require('../controllers/PatientController');

// Rota para obter todos os pacientes
router.get('/', patientController.getAllPatients);

// Rota para obter um paciente por ID
router.get('/:id', patientController.getPatientById);

// Rota para criar um novo paciente
router.post('/', patientController.createPatient);

// Rota para atualizar um paciente existente
router.put('/:id', patientController.updatePatient);

// Rota para deletar um paciente
router.delete('/:id', patientController.deletePatient);

module.exports = router; 