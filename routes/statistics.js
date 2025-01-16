const express = require('express');
const router = express.Router();
const StatisticsController = require('../controllers/StatisticsController');
const statisticsValidation = require('../utils/statisticsValidation');

// Get aggregated statistics with filters
router.get('/', statisticsValidation.validateFilters, StatisticsController.getStatistics);

// Get statistics by sector
router.get('/by-sector', statisticsValidation.validateFilters, StatisticsController.getBySector);

// Get statistics by responsible/role
router.get('/by-responsible', statisticsValidation.validateFilters, StatisticsController.getByResponsible);

// Get resolution rates
router.get('/resolution-rates', statisticsValidation.validateFilters, StatisticsController.getResolutionRates);

module.exports = router;