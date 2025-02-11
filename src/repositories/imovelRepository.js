const { Imovel } = require('../model/Imovel');
const {Estado} = require('../model/Estado');
const {Tipo} = require('../model/Tipo');
const {Photo} = require('../model/Photo');
const {Cidade} = require('../model/Cidade');
//
async function listarImovel(filtros = {}) {
  return await Imovel.findAll({
    where: filtros,
    include: [
      { model: Estado, as: 'estado', attributes: ['estado_id', 'nome'] },
      { model: Cidade, as: 'cidade', attributes: ['cidade_id', 'nome'] },
      { model: Tipo, as: 'tipo', attributes: ['tipo_id', 'nome'] },
      { model: Photo, as: 'photo', attributes: ['photo_id', 'imageData'] }
    ],
  });
}

async function buscarImovelPorId(id) {
  const imovel = await Imovel.findByPk(id, {
    include: [
      { model: Estado, as: 'estado', attributes: ['estado_id', 'nome'] },
      { model: Cidade, as: 'cidade', attributes: ['cidade_id', 'nome'] },
      { model: Tipo, as: 'tipo', attributes: ['tipo_id', 'nome'] },
      { model: Photo, as: 'photo', attributes: ['photo_id', 'imageData'] }
    ],
  });

  if (!imovel) {
    throw new Error('Imóvel não encontrado');
  }

  return imovel;
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
  deletarImovel
};
