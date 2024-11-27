const { Tipo } = require('../model/Tipo');

async function listarTipos() {
  return await Tipo.findAll();
}

async function buscarTipoPorId(id) {
  return await Tipo.findByPk(id);
}

async function criarTipo(dadosTipo) {
  const { nome } = dadosTipo;

  const tipo = await Tipo.create({ nome });
  return tipo;
}

async function atualizarTipo(id, dadosAtualizados) {
  const tipo = await Tipo.findByPk(id);

  if (!tipo) {
    throw new Error('Tipo não encontrado');
  }

  await tipo.update(dadosAtualizados);
  return tipo;
}

async function deletarTipo(id) {
  const tipo = await Tipo.findByPk(id);

  if (!tipo) {
    throw new Error('Tipo não encontrado');
  }

  await tipo.destroy();
  return { message: 'Tipo deletado com sucesso' };
}

module.exports = {
  listarTipos,
  buscarTipoPorId,
  criarTipo,
  atualizarTipo,
  deletarTipo,
};
