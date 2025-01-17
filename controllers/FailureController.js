// controllers/failureController.js
const {
  Failure,
  Form,
  TPInconsistencies,
  Responsible,
  Hospital,
  Sector,
  sequelize
} = require('../models');

// Obter todas as falhas
exports.getAllFailures = async (req, res) => {
  try {
    console.log('Iniciando busca de falhas...');

    const failures = await Failure.findAll({
      include: [
        {
          model: Hospital,
          as: 'hospital',
          attributes: ['id', 'name']
        },
        {
          model: Sector,
          as: 'sector',
          attributes: ['id', 'name']
        },
        {
          model: TPInconsistencies,
          as: 'tpInconsistencies', // Adicionando o alias aqui
          through: { attributes: [] },
          attributes: ['id', 'description', 'status']
        }
      ],
      attributes: [
        'id',
        'prontuarioCode',
        'status',
        'createDate',
        'updateDate'
      ],
      raw: false,
      nest: true
    });

    console.log('Dados brutos:', failures);
    res.json({
      status: 'success',
      data: failures
    });

  } catch (error) {
    console.error('Erro detalhado:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erro ao buscar falhas',
      error: error.message
    });
  }
};

// Obter uma falha por ID
exports.getFailureById = async (req, res) => {
  const { id } = req.params;
  try {
    const failure = await Failure.findByPk(id, {
      include: [
        { model: Form, as: 'formulario' },
        { model: TPInconsistencies, as: 'tpInconsistencies', through: { attributes: [] } },
        { model: Responsible, as: 'responsible' },
        { model: Hospital, as: 'hospital' },
        { model: Sector, as: 'sector' }
      ],
    });
    if (failure) {
      res.status(200).json(failure);
    } else {
      res.status(404).json({ message: 'Falha não encontrada.' });
    }
  } catch (error) {
    console.error('Erro ao obter a falha:', error);
    res.status(500).json({ message: 'Erro ao obter a falha.', error });
  }
};

// Criar uma nova falha
exports.createFailure = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    const {
      prontuarioCode,
      formularioId,
      formularioDate,
      professionalId,
      hospitalId,
      sectorId,
      observacoes,
      tpInconsistenciaIds,
      createUser
    } = req.body;

    // Criar a falha com status padrão
    const newFailure = await Failure.create({
      prontuarioCode,
      formularioId,
      formularioDate: formularioDate || new Date(),
      professionalId,
      hospitalId,
      sectorId,
      observacoes,
      createUser,
      status: 'Pending', // Adicionando status padrão
      createDate: new Date() // Adicionando data de criação
    }, { transaction });

    // Associar as inconsistências
    if (tpInconsistenciaIds?.length > 0) {
      await Promise.all(tpInconsistenciaIds.map(async (tpInconsistenciaId) => {
        await newFailure.addTpInconsistency(tpInconsistenciaId, { transaction });
      }));
    }

    await transaction.commit();

    // Retornar com associações
    const createdFailure = await Failure.findByPk(newFailure.id, {
      include: [
        { model: Form, as: 'formulario' },
        { model: TPInconsistencies, as: 'tpInconsistencies' },
        { model: Responsible, as: 'responsible' },
        { model: Hospital, as: 'hospital' },
        { model: Sector, as: 'sector' }
      ]
    });

    res.status(201).json(createdFailure);
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.error('Erro ao criar falha:', error);
    res.status(500).json({
      message: 'Erro ao criar falha',
      error: error.message
    });
  }
};

// Atualizar uma falha existente
exports.updateFailure = async (req, res) => {
  const { id } = req.params;
  const { prontuarioCode, formularioId, formularioDate, tpInconsistenciaIds, professionalId, hospitalId, sectorId, status, updateUser, observacoes } = req.body;
  const transaction = await sequelize.transaction();

  try {
    const failure = await Failure.findByPk(id, { transaction });
    if (!failure) {
      return res.status(404).json({ message: 'Falha não encontrada.' });
    }

    // Atualizar campos
    await failure.update(
      {
        prontuarioCode,
        formularioId,
        formularioDate,
        professionalId,
        hospitalId,
        sectorId,
        status,
        updateUser,
        observacoes,
      },
      { transaction }
    );

    // Atualizar associações de TPInconsistencies
    if (Array.isArray(tpInconsistenciaIds)) {
      const tpInconsistencies = await TPInconsistencies.findAll({
        where: { id: tpInconsistenciaIds },
        transaction,
      });

      if (tpInconsistencies.length !== tpInconsistenciaIds.length) {
        throw new Error('Algumas TPInconsistencies fornecidas não foram encontradas.');
      }

      await failure.setTpInconsistencies(tpInconsistencies, { transaction });
    }

    // Commit da transação
    await transaction.commit();

    // Recarregar a falha com as associações atualizadas
    const updatedFailure = await Failure.findByPk(id, {
      include: [
        { model: Form, as: 'formulario' },
        { model: TPInconsistencies, as: 'tpInconsistencies', through: { attributes: [] } },
        { model: Responsible, as: 'responsible' },
        { model: Hospital, as: 'hospital' },
        { model: Sector, as: 'sector' }
      ],
    });

    res.status(200).json(updatedFailure);

  } catch (error) {
    await transaction.rollback();
    console.error('Erro ao atualizar a falha:', error);
    res.status(500).json({ message: 'Erro ao atualizar a falha.', error: error.message });
  }
};

// Deletar uma falha
exports.deleteFailure = async (req, res) => {
  const { id } = req.params;
  try {
    const failure = await Failure.findByPk(id);
    if (failure) {
      await failure.destroy();
      res.status(200).json({ message: 'Falha deletada com sucesso.' });
    } else {
      res.status(404).json({ message: 'Falha não encontrada.' });
    }
  } catch (error) {
    console.error('Erro ao deletar a falha:', error);
    res.status(500).json({ message: 'Erro ao deletar a falha.', error });
  }
};
