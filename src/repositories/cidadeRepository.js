const { Cidade } = require('../model/Cidade');
const {Estado} = require('../model/Estado');

async function listarCidades() {
  return await Cidade.findAll(
    {
      include: [
        { model: Estado, as: 'estado', attributes: ['estado_id','nome'] },
      ]
    }
  );
}

async function buscarCidadePorId(id) {
  return await Cidade.findByPk(id);
}

async function criarCidade(dadosCidade) {
  const { nome, estado_id } = dadosCidade;

  if (!estado_id) {
    throw new Error('O estado_id é obrigatório');
  }

  const cidade = await Cidade.create({ nome, estado_id });
  return cidade;
}

async function atualizarCidade(id, dadosAtualizados) {
  const cidade = await Cidade.findByPk(id);

  if (!cidade) {
    throw new Error('Cidade não encontrada');
  }

  await cidade.update(dadosAtualizados);
  return cidade;
}

async function deletarCidade(id) {
  const cidade = await Cidade.findByPk(id);

  if (!cidade) {
    throw new Error('Cidade não encontrada');
  }

  await cidade.destroy();
  return { message: 'Cidade deletada com sucesso' };
}

module.exports = {
  listarCidades,
  buscarCidadePorId,
  criarCidade,
  atualizarCidade,
  deletarCidade,
};
