const { Cidade } = require('../model/Cidade');

async function listarCidades() {
  return await Cidade.findAll();
}

async function buscarCidadePorId(id) {
  return await Cidade.findByPk(id);
}

async function criarCidade(dadosCidade) {
  const { nome } = dadosCidade;

  const cidade = await Cidade.create({ nome });
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
