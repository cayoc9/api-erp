// controllers/failureController.js
const {
  Failure,
  Form,
  InconsistencyType,
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
          model: InconsistencyType,
          as: 'inconsistencyTypes',
          through: { attributes: [] }
        }
      ],
      attributes: [
        'id',
        'medicalRecordCode',
        'status',
        'createdAt',
        'updatedAt'
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
        { model: InconsistencyType, as: 'inconsistencyTypes', through: { attributes: [] } },
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
      medicalRecordCode,
      formId,
      formularioDate,
      professionalId,
      hospitalId,
      sectorId,
      observacoes,
      inconsistencyTypeId,
      createUser
    } = req.body;

    // Adicionar log para debug
    console.log('Dados recebidos:', {
      medicalRecordCode,
      formId,
      formularioDate,
      professionalId,
      hospitalId,
      sectorId,
      inconsistencyTypeId,
      createUser
    });

    // Verificar se o hospital existe
    const hospital = await Hospital.findByPk(hospitalId);
    console.log('Hospital encontrado:', hospital); // Log adicional

    if (!hospital) {
      return res.status(400).json({
        status: 'error',
        message: `Hospital com ID ${hospitalId} não encontrado`,
        debug: {
          receivedId: hospitalId,
          type: typeof hospitalId
        }
      });
    }

    if (!inconsistencyTypeId) {
      return res.status(400).json({ error: 'Tipo de inconsistência é obrigatório' });
    }

    if (!formId) {
      return res.status(400).json({ error: 'Formulário é obrigatório' });
    }

    // Criar a falha com status padrão
    const newFailure = await Failure.create({
      medicalRecordCode,
      formId,
      formularioDate: formularioDate || new Date(),
      professionalId,
      hospitalId,
      sectorId,
      observacoes,
      createUser,
      status: 'Pending', // Adicionando status padrão
      createdAt: new Date(), // Adicionando data de criação
      sectorResponsibleId: sectorId, // Usar o setor recebido
      sectorReporterId: 10, // ALA B por padrão (comente para editar esse trecho quando tivermos tabelas user)
      inconsistencyTypeId
    }, { transaction });

    await transaction.commit();

    // Retornar com associações
    const createdFailure = await Failure.findByPk(newFailure.id, {
      include: [
        { model: Form, as: 'formulario' },
        { model: InconsistencyType, as: 'inconsistencyType' },
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
  const { medicalRecordCode, formId, formularioDate, inconsistencyTypeId, professionalId, hospitalId, sectorId, status, updateUser, observacoes } = req.body;
  const transaction = await sequelize.transaction();

  try {
    const failure = await Failure.findByPk(id, { transaction });
    if (!failure) {
      return res.status(404).json({ message: 'Falha não encontrada.' });
    }

    // Atualizar campos
    await failure.update(
      {
        medicalRecordCode,
        formId,
        formularioDate,
        professionalId,
        hospitalId,
        sectorId,
        status,
        updateUser,
        observacoes,
        inconsistencyTypeId
      },
      { transaction }
    );

    // Commit da transação
    await transaction.commit();

    // Recarregar a falha com as associações atualizadas
    const updatedFailure = await Failure.findByPk(id, {
      include: [
        { model: Form, as: 'formulario' },
        { model: InconsistencyType, as: 'inconsistencyType' },
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
