const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/StatisticsController');
const { validateStatisticsParams } = require('../middlewares/validations/statisticsValidation');

// Main statistics endpoint
router.get('/',
  validateStatisticsParams,
  statisticsController.getStatistics
);

// Resolution rates over time
router.get('/resolutions',
  validateStatisticsParams,
  statisticsController.getResolutionRates
);

// Current status distribution
router.get('/status',
  validateStatisticsParams,
  statisticsController.getStatusDistribution
);

// Breakdowns for bar charts
router.get('/breakdowns',
  validateStatisticsParams,
  statisticsController.getBreakdowns
);

module.exports = router;