// routes/sectors.js
const express = require('express');
const router = express.Router();
const sectorController = require('../controllers/SectorController.js');

// Rota para obter todos os setores
router.get('/', sectorController.getAllSectors);

// Rota para obter um setor por ID
router.get('/:id', sectorController.getSectorById);

// Rota para criar um novo setor
router.post('/', sectorController.createSector);

// Rota para atualizar um setor existente
router.put('/:id', sectorController.updateSector);

// Rota para deletar um setor
router.delete('/:id', sectorController.deleteSector);

module.exports = router;
