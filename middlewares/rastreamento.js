const trackingFields = require('../utils/trackingFields');

const trackingMiddleware = (req, res, next) => {
  // Assume que o ID do usuário está disponível em req.user.id
  const userId = req.user?.id;

  // Adiciona campos de tracking baseado no método HTTP
  if (req.method === 'POST') {
    req.body = {
      ...req.body,
      ...trackingFields.getCreateFields(userId)
    };
  } else if (['PUT', 'PATCH'].includes(req.method)) {
    req.body = {
      ...req.body,
      ...trackingFields.getUpdateFields(userId)
    };
  }

  next();
};

module.exports = trackingMiddleware;
