const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // limite por IP
  message: {
    status: 'error',
    message: 'Muitas requisições, tente novamente mais tarde',
    code: 429
  },
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = rateLimiter;
