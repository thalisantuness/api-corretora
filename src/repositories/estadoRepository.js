const { Estado } = require('../model/Estado');

async function listarEstados() {
  return await Estado.findAll();
}

async function buscarEstadoPorId(id) {
  return await Estado.findByPk(id);
}

async function criarEstado(dadosEstado) {
  const { nome } = dadosEstado;

  const estado = await Estado.create({ nome });
  return estado;
}

async function atualizarEstado(id, dadosAtualizados) {
  const estado = await Estado.findByPk(id);

  if (!estado) {
    throw new Error('Estado não encontrado');
  }

  await estado.update(dadosAtualizados);
  return estado;
}

async function deletarEstado(id) {
  const estado = await Estado.findByPk(id);

  if (!estado) {
    throw new Error('Estado não encontrado');
  }

  await estado.destroy();
  return { message: 'Estado deletado com sucesso' };
}

module.exports = {
  listarEstados,
  buscarEstadoPorId,
  criarEstado,
  atualizarEstado,
  deletarEstado,
};
