/**
 * Validation middleware for statistics endpoints
 */

const validateFilters = (req, res, next) => {
  const { startDate, endDate, sectorId, role } = req.query;

  try {
    // Validate date range if provided
    if (startDate) {
      const start = new Date(startDate);
      if (isNaN(start.getTime())) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid startDate format. Use ISO date format (YYYY-MM-DD)',
          code: 400
        });
      }
    }

    if (endDate) {
      const end = new Date(endDate);
      if (isNaN(end.getTime())) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid endDate format. Use ISO date format (YYYY-MM-DD)',
          code: 400
        });
      }
    }

    // Validate sectorId if provided
    if (sectorId && isNaN(parseInt(sectorId))) {
      return res.status(400).json({
        status: 'error',
        message: 'sectorId must be a valid integer',
        code: 400
      });
    }

    // Validate role if provided
    if (role && typeof role !== 'string') {
      return res.status(400).json({
        status: 'error',
        message: 'role must be a string',
        code: 400
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Error validating request parameters',
      code: 500
    });
  }
};

module.exports = {
  validateFilters
};