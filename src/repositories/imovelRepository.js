const { Imovel } = require('../model/Imovel');

async function listarImovel() {
  return await Imovel.findAll();
}

async function criarImovel(dadosImovel) {
  const {
    nome,
    description,
    valor,
    valor_condominio,
    n_quartos,
    n_banheiros,
    n_vagas,
    tipo_id,
    cidade_id,
    estado_id,
    imageData,
  } = dadosImovel;

  const imovel = await Imovel.create({
    nome,
    description,
    valor,
    valor_condominio,
    n_quartos,
    n_banheiros,
    n_vagas,
    tipo_id,
    cidade_id,
    estado_id,
    imageData, 
  });

  return imovel;
}

async function buscarImovelPorId(id) {
  const imovel = await Imovel.findByPk(id);

  if (!imovel) {
    throw new Error('Imóvel não encontrado');
  }

  return imovel;
}

async function atualizarImovel(id, dadosAtualizados) {
  const imovel = await Imovel.findByPk(id);

  if (!imovel) {
    throw new Error('Imóvel não encontrado');
  }

  await imovel.update(dadosAtualizados);
  return imovel;
}

async function deletarImovel(id) {
  const imovel = await Imovel.findByPk(id);

  if (!imovel) {
    throw new Error('Imóvel não encontrado');
  }

  await imovel.destroy();
  return { message: 'Imóvel deletado com sucesso' };
}

module.exports = {
  listarImovel,
  criarImovel,
  buscarImovelPorId,
  atualizarImovel,
  deletarImovel,
};
