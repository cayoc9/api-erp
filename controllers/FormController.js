// controllers/FormController.js
const { Form, Failure, TPInconsistencies, Responsible, Hospital, Sector, sequelize } = require('../models');

const validateFailureData = (failureData) => {
  const requiredFields = [
    'prontuarioCode',
    'professionalId',
    'hospitalId',
    'sectorId',
    'tpInconsistenciaIds'
  ];

  for (const field of requiredFields) {
    if (!failureData[field]) {
      throw new Error(`Campo obrigatório ausente: ${field}`);
    }
  }

  // Validar tipos numéricos
  if (isNaN(Number(failureData.hospitalId))) {
    throw new Error('hospitalId deve ser um número válido');
  }

  if (isNaN(Number(failureData.professionalId))) {
    throw new Error('professionalId deve ser um número válido');
  }

  if (isNaN(Number(failureData.sectorId))) {
    throw new Error('sectorId deve ser um número válido');
  }

  // Validar formularioId existente
  if (!failureData.formularioId) {
    throw new Error('Campo obrigatório ausente: formularioId');
  }

  if (isNaN(Number(failureData.formularioId))) {
    throw new Error('formularioId deve ser um número válido');
  }

  // Validar data do formulário
  if (failureData.formularioDate && !isValidDate(failureData.formularioDate)) {
    throw new Error('Data do formulário inválida');
  }

  if (!Array.isArray(failureData.tpInconsistenciaIds) || failureData.tpInconsistenciaIds.length === 0) {
    throw new Error('É necessário informar pelo menos uma inconsistência');
  }
};

const isValidDate = (dateString) => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

const validateFormData = (formData) => {
  // Validar versão
  if (formData.version && (!Number.isInteger(formData.version) || formData.version < 1)) {
    throw new Error('Versão deve ser um número inteiro positivo');
  }
};

exports.createFormWithFailures = async (req, res) => {
  try {
    const { createUser, failures, observacoes } = req.body;

    if (!createUser) {
      throw new Error('Campo "createUser" é obrigatório.');
    }
    for (const failureData of failures) {
      const form = await Form.findByPk(failureData.formularioId);
      if (!form) {
        throw new Error(`Formulário com ID ${failureData.formularioId} não encontrado.`);
      }
      await Failure.create({
        ...failureData,
        observacoes, // Salva as observações associadas à falha
        createUser,
      });
    }
    res.status(201).json({ message: 'Formulário e inconsistências criados com sucesso.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllForms = async (req, res) => {
  try {
    console.log('Iniciando busca de formulários...');
    
    // Logar a query SQL
    const forms = await Form.findAll({
      logging: console.log // Isso vai mostrar a SQL gerada
    });
    
    console.log('Formulários encontrados:', forms);
    console.log('Raw data:', forms.map(f => f.get({ plain: true })));
    
    res.status(200).json(forms);
  } catch (error) {
    console.error('Erro detalhado:', error);
    res.status(500).json({ message: 'Erro ao obter formulários', error: error.message });
  }
};

// Implementar outros métodos
exports.getFormById = async (req, res) => {
  try {
    const form = await Form.findByPk(req.params.id);
    if (form) {
      res.status(200).json(form);
    } else {
      res.status(404).json({ message: 'Formulário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter formulário', error });
  }
};

exports.createForm = async (req, res) => {
  try {
    const newForm = await Form.create(req.body);
    res.status(201).json(newForm);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar formulário', error });
  }
};

exports.updateForm = async (req, res) => {
  try {
    const [updated] = await Form.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedForm = await Form.findByPk(req.params.id);
      res.status(200).json(updatedForm);
    } else {
      res.status(404).json({ message: 'Formulário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar formulário', error });
  }
};

exports.deleteForm = async (req, res) => {
  try {
    const deleted = await Form.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Formulário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar formulário', error });
  }
};
