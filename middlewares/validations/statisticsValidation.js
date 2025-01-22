const { query } = require('express-validator');

/**
 * Validação unificada para parâmetros de estatísticas
 */
const validateStatisticsParams = (req, res, next) => {
  try {
    const { startDate, endDate, sectorId, roleId, status } = req.query;
    const errors = validateDates(startDate, endDate);

    // Adiciona erros de IDs e status se houver
    validateIds(sectorId, roleId, errors);
    validateStatus(status, errors);

    if (errors.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Erro de validação',
        errors,
        code: 400
      });
    }

    // Atribui parâmetros validados
    req.validatedParams = sanitizeParams(startDate, endDate, sectorId, roleId, status);
    next();

  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Erro interno na validação',
      code: 500
    });
  }
};

// Funções auxiliares
const validateDates = (startDate, endDate) => {
  const errors = [];

  if (!startDate || !endDate) {
    errors.push('Datas inicial e final são obrigatórias');
    return errors;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  const yearInMs = 365 * 24 * 60 * 60 * 1000;

  if (isNaN(start.getTime())) {
    errors.push('Data inicial inválida (use YYYY-MM-DD)');
  }
  if (isNaN(end.getTime())) {
    errors.push('Data final inválida (use YYYY-MM-DD)');
  }
  if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
    if (start > end) {
      errors.push('Data inicial deve ser anterior à final');
    }
    if (end - start > yearInMs) {
      errors.push('Intervalo máximo permitido é 1 ano');
    }
  }

  return errors;
};

const validateIds = (sectorId, roleId, errors) => {
  if (sectorId && (isNaN(parseInt(sectorId)) || parseInt(sectorId) <= 0)) {
    errors.push('ID do setor deve ser um número positivo');
  }
  if (roleId && (isNaN(parseInt(roleId)) || parseInt(roleId) <= 0)) {
    errors.push('ID do cargo deve ser um número positivo');
  }
};

const validateStatus = (status, errors) => {
  const validStatuses = ['PENDING', 'RESOLVED'];
  if (status && !validStatuses.includes(status.toUpperCase())) {
    errors.push(`Status deve ser: ${validStatuses.join(' ou ')}`);
  }
};

const sanitizeParams = (startDate, endDate, sectorId, roleId, status) => ({
  startDate: new Date(startDate),
  endDate: new Date(endDate),
  sectorId: sectorId ? parseInt(sectorId) : null,
  roleId: roleId ? parseInt(roleId) : null,
  status: status ? status.toUpperCase() : null
});

module.exports = {
  validateStatisticsParams
};
