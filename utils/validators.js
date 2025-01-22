const validators = {
  isValidDate: (date) => {
    return date instanceof Date && !isNaN(date);
  },

  isValidId: (id) => {
    return Number.isInteger(id) && id > 0;
  },

  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  sanitizeFilters: (filters) => {
    const sanitized = {};
    Object.keys(filters).forEach(key => {
      if (filters[key] !== null && filters[key] !== undefined) {
        sanitized[key] = filters[key];
      }
    });
    return sanitized;
  }
};

module.exports = validators;
