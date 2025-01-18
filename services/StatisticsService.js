//StatisticsService.js

const { Op, Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const { Failure, TPInconsistencies, Sector, Responsible } = require('../models');

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
      where: {
        createDate: { [Op.between]: [startDate, endDate] },
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
    try {
      const result = await Failure.findAll({
        attributes: [
          [sequelize.fn('COUNT', '*'), 'count'],
          [sequelize.col('tpInconsistencies.description'), 'description']
        ],
        include: [{
          model: TPInconsistencies,
          as: 'tpInconsistencies',
          attributes: [],
          through: { attributes: [] } // Remove atributos da tabela de junção
        }],
        where: {
          create_date: { [Op.between]: [startDate, endDate] },
          ...this._buildFilters(filters)
        },
        group: ['tpInconsistencies.description'], // Simplifica o agrupamento
        raw: true // Retorna objetos planos
      });

      return result;
    } catch (error) {
      console.error('Erro ao buscar distribuição por tipo:', error);
      throw error;
    }
  }

  async _getFormDistribution(startDate, endDate, filters) {
    return await Failure.findAll({
      where: {
        createDate: { [Op.between]: [startDate, endDate] },
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
        createDate: { [Op.between]: [startDate, endDate] },
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
        model: Responsible,
        as: 'responsible',
        attributes: ['role']
      }],
      where: {
        createDate: { [Op.between]: [startDate, endDate] },
        ...this._buildFilters(filters)
      },
      attributes: [
        [sequelize.fn('COUNT', '*'), 'count'],
        [sequelize.col('responsible.role'), 'role']
      ],
      group: ['responsible.role']
    });
  }

  async _getRoleDistribution(startDate, endDate, filters) {
    return await Failure.findAll({
      include: [{
        model: Responsible,
        as: 'responsible',
        attributes: ['role']
      }],
      where: {
        createDate: { [Op.between]: [startDate, endDate] },
        ...this._buildFilters(filters)
      },
      attributes: [
        [sequelize.fn('COUNT', '*'), 'count'],
        [sequelize.col('responsible.role'), 'role']
      ],
      group: ['responsible.role']
    });
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