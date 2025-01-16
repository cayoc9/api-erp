/**
 * Controller para lidar com CRUD de TPInconsistencies (tipos de inconsistências).
 * - getAllTPInconsistencies: lista todas, possivelmente com include de Falhas
 * - getTPInconsistencyById: pega uma específica
 * - createTPInconsistency: cria um novo tipo
 * - updateTPInconsistency: atualiza campos
 * - deleteTPInconsistency: remove um registro
 */

const { TPInconsistencies, Failure } = require('../models');

/**
 * GET /api/tp-inconsistencies
 * Obtém todas as TPInconsistencies com suas falhas associadas.
 */
exports.getAllTPInconsistencies = async (req, res) => {
  console.log('GET /api/tp-inconsistencies - Início da requisição');
  try {
    const tpInconsistencies = await TPInconsistencies.findAll({
      include: [{ model: Failure, as: 'failures' }],
    });
    console.log('GET /api/tp-inconsistencies - Sucesso na obtenção das inconsistências');
    res.status(200).json(tpInconsistencies);
  } catch (error) {
    console.error('GET /api/tp-inconsistencies - Erro:', error);
    res.status(500).json({ message: 'Erro ao obter as TP Inconsistencies.', error: error.message });
  }
};

/**
 * GET /api/tp-inconsistencies/:id
 * Obtém uma TPInconsistency específica por ID com suas falhas associadas.
 */
exports.getTPInconsistencyById = async (req, res) => {
  const { id } = req.params;
  console.log(`GET /api/tp-inconsistencies/${id} - Início da requisição`);
  try {
    const tpInconsistency = await TPInconsistencies.findByPk(id, {
      include: [{ model: Failure, as: 'failures' }],
    });
    if (tpInconsistency) {
      console.log(`GET /api/tp-inconsistencies/${id} - Inconsistência encontrada`);
      res.status(200).json(tpInconsistency);
    } else {
      console.warn(`GET /api/tp-inconsistencies/${id} - Inconsistência não encontrada`);
      res.status(404).json({ message: 'TP Inconsistency não encontrada.' });
    }
  } catch (error) {
    console.error(`GET /api/tp-inconsistencies/${id} - Erro:`, error);
    res.status(500).json({ message: 'Erro ao obter a TP Inconsistency.', error: error.message });
  }
};

/**
 * POST /api/tp-inconsistencies
 * Cria uma nova TPInconsistency.
 */
exports.createTPInconsistency = async (req, res) => {
  const { description, status, createUser } = req.body;
  console.log('POST /api/tp-inconsistencies - Início da requisição', { description, status, createUser });
  try {
    const newTPInconsistency = await TPInconsistencies.create({ description, status, createUser });
    console.log('POST /api/tp-inconsistencies - Inconsistência criada com sucesso', newTPInconsistency);
    res.status(201).json(newTPInconsistency);
  } catch (error) {
    console.error('POST /api/tp-inconsistencies - Erro ao criar a TP Inconsistency:', error);
    res.status(500).json({ message: 'Erro ao criar a TP Inconsistency.', error: error.message });
  }
};

/**
 * PUT /api/tp-inconsistencies/:id
 * Atualiza uma TPInconsistency existente.
 */
exports.updateTPInconsistency = async (req, res) => {
  const { id } = req.params;
  const { description, status, updateUser } = req.body;
  console.log(`PUT /api/tp-inconsistencies/${id} - Início da requisição`, { description, status, updateUser });
  try {
    const tpInconsistency = await TPInconsistencies.findByPk(id);
    if (!tpInconsistency) {
      console.warn(`PUT /api/tp-inconsistencies/${id} - Inconsistência não encontrada`);
      return res.status(404).json({ message: 'TP Inconsistency não encontrada.' });
    }

    await tpInconsistency.update({ description, status, updateUser });
    console.log(`PUT /api/tp-inconsistencies/${id} - Inconsistência atualizada com sucesso`, tpInconsistency);
    res.status(200).json(tpInconsistency);
  } catch (error) {
    console.error(`PUT /api/tp-inconsistencies/${id} - Erro ao atualizar a TP Inconsistency:`, error);
    res.status(500).json({ message: 'Erro ao atualizar a TP Inconsistency.', error: error.message });
  }
};

/**
 * DELETE /api/tp-inconsistencies/:id
 * Remove uma TPInconsistency existente.
 */
exports.deleteTPInconsistency = async (req, res) => {
  const { id } = req.params;
  console.log(`DELETE /api/tp-inconsistencies/${id} - Início da requisição`);
  try {
    const tpInconsistency = await TPInconsistencies.findByPk(id);
    if (!tpInconsistency) {
      console.warn(`DELETE /api/tp-inconsistencies/${id} - Inconsistência não encontrada`);
      return res.status(404).json({ message: 'TP Inconsistency não encontrada.' });
    }
    await tpInconsistency.destroy();
    console.log(`DELETE /api/tp-inconsistencies/${id} - Inconsistência deletada com sucesso`);
    res.status(200).json({ message: 'TP Inconsistency deletada com sucesso.' });
  } catch (error) {
    console.error(`DELETE /api/tp-inconsistencies/${id} - Erro ao deletar a TP Inconsistency:`, error);
    res.status(500).json({ message: 'Erro ao deletar a TP Inconsistency.', error: error.message });
  }
};
