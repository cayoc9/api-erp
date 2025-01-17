// middleware/statisticsValidation.js

const { sanitizeQuery } = require('express-validator/filter');

/**
 * Validates and sanitizes query parameters for statistics endpoints
 */
const validateFilters = (req, res, next) => {
  const { startDate, endDate, sectorId, roleId, status } = req.query;
  const errors = [];

  // Required date range validation
  if (!startDate || !endDate) {
    errors.push('Both startDate and endDate are required');
  }

  // Date format and range validation
  if (startDate) {
    const start = new Date(startDate);
    if (isNaN(start.getTime())) {
      errors.push('Invalid startDate format. Use ISO date format (YYYY-MM-DD)');
    }
  }

  if (endDate) {
    const end = new Date(endDate);
    if (isNaN(end.getTime())) {
      errors.push('Invalid endDate format. Use ISO date format (YYYY-MM-DD)');
    }
  }

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start > end) {
      errors.push('startDate must be before endDate');  
    }
    // Validate range is not too large (e.g. max 1 year)
    const yearInMs = 365 * 24 * 60 * 60 * 1000;
    if (end - start > yearInMs) {
      errors.push('Date range cannot exceed 1 year');
    }
  }

  // Validate sectorId
  if (sectorId !== undefined) {
    const id = parseInt(sectorId);
    if (isNaN(id) || id <= 0) {
      errors.push('sectorId must be a positive integer');
    }
  }

  // Validate roleId
  if (roleId !== undefined) {
    const id = parseInt(roleId);
    if (isNaN(id) || id <= 0) {
      errors.push('roleId must be a positive integer');  
    }
  }

  // Validate status
  const validStatuses = ['PENDING', 'RESOLVED'];
  if (status && !validStatuses.includes(status.toUpperCase())) {
    errors.push(`status must be one of: ${validStatuses.join(', ')}`);
  }

  // Return validation errors
  if (errors.length > 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: errors,
      code: 400
    });
  }

  // Sanitize and attach validated params to request
  req.validatedParams = {
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    sectorId: sectorId ? parseInt(sectorId) : null,
    roleId: roleId ? parseInt(roleId) : null,
    status: status ? status.toUpperCase() : null
  };

  next();
};

module.exports = {
  validateFilters
};