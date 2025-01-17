const { Op } = require('sequelize');
const { Failure, TPInconsistency, Sector, Role } = require('../models');

class StatisticsService {
  async getLineChartData(startDate, endDate, filters = {}) {
    const failures = await Failure.findAll({
      where: {
        createdAt: { [Op.between]: [startDate, endDate] },
        ...this._buildFilters(filters)
      },
      attributes: [
        [sequelize.fn('date_trunc', 'month', sequelize.col('createdAt')), 'month'],
        [sequelize.fn('COUNT', '*'), 'total'],
        [sequelize.fn('COUNT', sequelize.literal("CASE WHEN status = 'RESOLVED' THEN 1 END")), 'resolved']
      ],
      group: [sequelize.fn('date_trunc', 'month', sequelize.col('createdAt'))],
      order: [[sequelize.fn('date_trunc', 'month', sequelize.col('createdAt')), 'ASC']]
    });

    return failures.map(f => ({
      month: f.dataValues.month,
      resolvedRate: (f.dataValues.resolved / f.dataValues.total) * 100
    }));
  }

  async getPieChartData(startDate, endDate, filters = {}) {
    const counts = await Failure.findAll({
      where: {
        createdAt: { [Op.between]: [startDate, endDate] },
        ...this._buildFilters(filters)
      },
      attributes: [
        ['status', 'status'],
        [sequelize.fn('COUNT', '*'), 'count']
      ],
      group: ['status']
    });

    return {
      resolved: counts.find(c => c.status === 'RESOLVED')?.count || 0,
      pending: counts.find(c => c.status === 'PENDING')?.count || 0
    };
  }

  async getBarChartData(startDate, endDate, filters = {}) {
    const [byType, byForm, bySector, byResponsible, byRole] = await Promise.all([
      this._getTypeDistribution(startDate, endDate, filters),
      this._getFormDistribution(startDate, endDate, filters),
      this._getSectorDistribution(startDate, endDate, filters),
      this._getResponsibleDistribution(startDate, endDate, filters),
      this._getRoleDistribution(startDate, endDate, filters)
    ]);

    return {
      byType,
      byForm,
      bySector,
      byResponsible,
      byRole
    };
  }

  async _getTypeDistribution(startDate, endDate, filters) {
    return await Failure.findAll({
      include: [{
        model: TPInconsistency,
        attributes: ['type'],
        through: { attributes: [] }
      }],
      where: {
        createdAt: { [Op.between]: [startDate, endDate] },
        ...this._buildFilters(filters)
      },
      attributes: [
        [sequelize.fn('COUNT', '*'), 'count']
      ],
      group: ['TPInconsistency.type']
    });
  }

  async _getFormDistribution(startDate, endDate, filters) {
    return await Failure.findAll({
      where: {
        createdAt: { [Op.between]: [startDate, endDate] },
        ...this._buildFilters(filters)
      },
      attributes: [
        'formType',
        [sequelize.fn('COUNT', '*'), 'count']
      ],
      group: ['formType']
    });
  }

  async _getSectorDistribution(startDate, endDate, filters) {
    return await Failure.findAll({
      include: [{
        model: Sector,
        as: 'sectorReporter',
        attributes: ['name']
      }],
      where: {
        createdAt: { [Op.between]: [startDate, endDate] },
        ...this._buildFilters(filters)
      },
      attributes: [
        [sequelize.fn('COUNT', '*'), 'count']
      ],
      group: ['sectorReporter.name']
    });
  }

  async _getResponsibleDistribution(startDate, endDate, filters) {
    return await Failure.findAll({
      include: [{
        model: Sector,
        as: 'sectorResponsible',
        attributes: ['name']
      }],
      where: {
        createdAt: { [Op.between]: [startDate, endDate] },
        ...this._buildFilters(filters)
      },
      attributes: [
        [sequelize.fn('COUNT', '*'), 'count']
      ],
      group: ['sectorResponsible.name']
    });
  }

  async _getRoleDistribution(startDate, endDate, filters) {
    return await Failure.findAll({
      include: [{
        model: Role,
        attributes: ['name']
      }],
      where: {
        createdAt: { [Op.between]: [startDate, endDate] },
        ...this._buildFilters(filters)
      },
      attributes: [
        [sequelize.fn('COUNT', '*'), 'count']
      ],
      group: ['Role.name']
    });
  }

  _buildFilters(filters) {
    const where = {};
    
    if (filters.sectorId) {
      where.sectorReporterId = filters.sectorId;
    }
    
    if (filters.roleId) {
      where.roleId = filters.roleId;
    }
    
    if (filters.status) {
      where.status = filters.status;
    }
    
    return where;
  }
}

module.exports = new StatisticsService();