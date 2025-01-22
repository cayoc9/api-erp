const validations = {
  statistics: require('./validations/statisticsValidation')
};

module.exports = {
  auth: require('./auth'),
  validations,
  requestLogger: require('./requestLogger'),
  rateLimiter: require('./rateLimiter'),
  tracking: require('./tracking'),
  paginate: require('./paginate')
};
