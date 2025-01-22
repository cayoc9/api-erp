class QueryBuilder {
  static buildPagination(page = 1, limit = 10) {
    return {
      offset: (page - 1) * limit,
      limit: parseInt(limit)
    };
  }

  static buildOrder(field = 'id', direction = 'ASC') {
    return [[field, direction.toUpperCase()]];
  }

  static buildWhereClause(filters = {}) {
    const where = {};
    Object.keys(filters).forEach(key => {
      if (filters[key] !== null && filters[key] !== undefined) {
        where[key] = filters[key];
      }
    });
    return where;
  }

  static buildDateRangeFilter(startDate, endDate, field = 'createDate') {
    const { Op } = require('sequelize');
    return {
      [field]: {
        [Op.between]: [startDate, endDate]
      }
    };
  }
}

module.exports = QueryBuilder;
