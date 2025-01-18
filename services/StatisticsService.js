//StatisticsService.js

const { Op, Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const { Failure, TPInconsistencies, Sector, Responsible, Form } = require('../models'); // Adicionando Form

class StatisticsService {
  async getLineChartData(startDate, endDate, filters = {}) {
    const failures = await Failure.findAll({
      where: {
        create_date: { [Op.between]: [startDate, endDate] },
        ...this._buildFilters(filters)
      },
      attributes: [
        [sequelize.fn('date_trunc', 'month', sequelize.col('create_date')), 'month'],
        [sequelize.fn('COUNT', '*'), 'total'],
        [sequelize.fn('COUNT', sequelize.literal("CASE WHEN status = 'RESOLVED' THEN 1 END")), 'resolved']
      ],
      group: [sequelize.fn('date_trunc', 'month', sequelize.col('create_date'))],
      order: [[sequelize.fn('date_trunc', 'month', sequelize.col('create_date')), 'ASC']]
    });

    return failures.map(f => ({
      month: f.get('month'),
      resolvedRate: (f.get('resolved') / f.get('total')) * 100 || 0
    }));
  }

  async getPieChartData(startDate, endDate, filters = {}) {
    const counts = await Failure.findAll({
      ...this._getBaseQueryConfig(startDate, endDate, filters),
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
      ...this._getBaseQueryConfig(startDate, endDate, filters),
      attributes: [
        [sequelize.col('tpInconsistencies.description'), 'description'],
        [sequelize.fn('COUNT', '*'), 'count']
      ],
      include: [{
        model: TPInconsistencies,
        as: 'tpInconsistencies',
        attributes: [],
        through: { attributes: [] }
      }],
      group: ['tpInconsistencies.description']
    });
  }

  async _getFormDistribution(startDate, endDate, filters) {
    return await Failure.findAll({
      attributes: [
        [sequelize.col('formulario.description'), 'formType'],
        [sequelize.fn('COUNT', '*'), 'count']
      ],
      include: [{
        model: Form,
        as: 'formulario',
        attributes: []
      }],
      where: {
        create_date: { [Op.between]: [startDate, endDate] },
        ...this._buildFilters(filters)
      },
      group: ['formulario.description'],
      raw: true
    });
  }

  async _getSectorDistribution(startDate, endDate, filters) {
    return await Failure.findAll({
      attributes: [
        [sequelize.col('sectorReporter.name'), 'name'],
        [sequelize.fn('COUNT', '*'), 'count']
      ],
      include: [{
        model: Sector,
        as: 'sectorReporter',
        attributes: []
      }],
      where: {
        create_date: { [Op.between]: [startDate, endDate] },
        ...this._buildFilters(filters)
      },
      group: ['sectorReporter.name', 'sectorReporter.id'],
      raw: true
    });
  }

  async _getResponsibleDistribution(startDate, endDate, filters) {
    return await Failure.findAll({
      include: [{
        model: Responsible,
        as: 'responsible',
        attributes: ['role']
      }],
      where: {
        create_date: { [Op.between]: [startDate, endDate] },
        ...this._buildFilters(filters)
      },
      attributes: [
        [sequelize.fn('COUNT', '*'), 'count'],
        [sequelize.col('responsible.role'), 'role']
      ],
      group: ['responsible.role', 'responsible.id'],
      raw: true
    });
  }

  async _getRoleDistribution(startDate, endDate, filters) {
    return await Failure.findAll({
      ...this._getBaseQueryConfig(startDate, endDate, filters),
      attributes: [
        [sequelize.col('responsible.role'), 'role'],
        [sequelize.fn('COUNT', '*'), 'count']
      ],
      include: [{
        model: Responsible,
        as: 'responsible',
        attributes: []
      }],
      group: ['responsible.role', 'responsible.id']
    });
  }


  _getBaseQueryConfig(startDate, endDate, filters) {
    return {
      where: {
        create_date: { [Op.between]: [startDate, endDate] },
        ...this._buildFilters(filters)
      },
      raw: true
    };
  }

  _buildFilters(filters) {
    const where = {};

    if (filters.sectorId) {
      where.sector_id = filters.sectorId;
    }

    if (filters.roleId) {
      where.professional_id = filters.roleId;
    }

    if (filters.status) {
      where.status = filters.status;
    }

    return where;
  }
}

module.exports = new StatisticsService();