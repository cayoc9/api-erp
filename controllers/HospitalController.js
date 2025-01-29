// controllers/HospitalController.js
const { Hospital, GrupoHospitalar, Setor } = require('../models');

// Obter todos os hospitais
exports.obterTodosHospitais = async (req, res) => {
  try {
    const hospitais = await Hospital.findAll({
      include: [
        { model: GrupoHospitalar, as: 'grupoHospitalar' },
        { model: Setor, as: 'setores' }
      ],
    });
    res.status(200).json(hospitais);
  } catch (erro) {
    res.status(500).json({
      mensagem: 'Erro ao obter os hospitais',
      erro: erro.message
    });
  }
};

// Obter um hospital por ID
exports.obterHospitalPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const hospital = await Hospital.findByPk(id, {
      include: [
        { model: GrupoHospitalar, as: 'grupoHospitalar' },
        { model: Setor, as: 'setores' }
      ],
    });
    if (hospital) {
      res.status(200).json(hospital);
    } else {
      res.status(404).json({ mensagem: 'Hospital não encontrado' });
    }
  } catch (erro) {
    res.status(500).json({
      mensagem: 'Erro ao obter o hospital',
      erro: erro.message
    });
  }
};

// Criar um novo hospital
exports.criarHospital = async (req, res) => {
  const {
    nome,
    grupoId,
    subgrupoId,
    uf,
    municipio,
    codigoCnes,
    codigoAcessoPlataforma,
    tipoHospital,
    sigla,
    cnpj,
    endereco,
    usuarioCriacao
  } = req.body;

  try {
    const novoHospital = await Hospital.create({
      nome,
      grupoId,
      subgrupoId,
      uf,
      municipio,
      codigoCnes,
      codigoAcessoPlataforma,
      tipoHospital,
      sigla,
      cnpj,
      endereco,
      usuarioCriacao
    });
    res.status(201).json(novoHospital);
  } catch (erro) {
    res.status(500).json({
      mensagem: 'Erro ao criar o hospital',
      erro: erro.message
    });
  }
};

// Atualizar um hospital existente
exports.atualizarHospital = async (req, res) => {
  const { id } = req.params;
  const {
    nome,
    grupoId,
    subgrupoId,
    uf,
    municipio,
    codigoCnes,
    codigoAcessoPlataforma,
    tipoHospital,
    sigla,
    cnpj,
    endereco,
    usuarioAtualizacao
  } = req.body;

  try {
    const hospital = await Hospital.findByPk(id);
    if (hospital) {
      await hospital.update({
        nome,
        grupoId,
        subgrupoId,
        uf,
        municipio,
        codigoCnes,
        codigoAcessoPlataforma,
        tipoHospital,
        sigla,
        cnpj,
        endereco,
        usuarioAtualizacao
      });
      res.status(200).json(hospital);
    } else {
      res.status(404).json({ mensagem: 'Hospital não encontrado' });
    }
  } catch (erro) {
    res.status(500).json({
      mensagem: 'Erro ao atualizar o hospital',
      erro: erro.message
    });
  }
};

// Deletar um hospital
exports.deletarHospital = async (req, res) => {
  const { id } = req.params;
  try {
    const hospital = await Hospital.findByPk(id);
    if (hospital) {
      await hospital.destroy();
      res.status(200).json({ mensagem: 'Hospital deletado com sucesso' });
    } else {
      res.status(404).json({ mensagem: 'Hospital não encontrado' });
    }
  } catch (erro) {
    res.status(500).json({
      mensagem: 'Erro ao deletar o hospital',
      erro: erro.message
    });
  }
};

module.exports = exports;
