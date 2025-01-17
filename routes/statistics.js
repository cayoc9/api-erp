const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/StatisticsController');
const statisticsValidation = require('../middleware/statisticsValidation');

// Main statistics endpoint with query parameters:
// - startDate: datetime (required)
// - endDate: datetime (required)
// - sectorId: integer (optional)  
// - roleId: integer (optional)
// - status: string (optional)
router.get('/', 
  statisticsValidation.validateDateRange,
  statisticsValidation.validateFilters,
  statisticsController.getStatistics
);

// Resolution rates over time (line chart)
router.get('/resolutions',
  statisticsValidation.validateDateRange,
  statisticsValidation.validateFilters,
  statisticsController.getResolutionRates
);

// Current status distribution (pie chart)
router.get('/status',
  statisticsValidation.validateDateRange,
  statisticsValidation.validateFilters,
  statisticsController.getStatusDistribution
);

// Breakdowns for bar charts
router.get('/breakdowns',
  statisticsValidation.validateDateRange,
  statisticsValidation.validateFilters,
  statisticsController.getBreakdowns
);

module.exports = router;