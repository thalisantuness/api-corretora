const { Imovel } = require("../model/Imovel");
const { Estado } = require("../model/Estado");
const { Tipo } = require("../model/Tipo");
const { Photo } = require("../model/Photo");
const { Cidade } = require("../model/Cidade");

async function listarImovel(filtros = {}) {
  return await Imovel.findAll({
    where: filtros,
    include: [
      { model: Estado, as: "estado", attributes: ["estado_id", "nome"] },
      { model: Cidade, as: "cidade", attributes: ["cidade_id", "nome"] },
      { model: Tipo, as: "tipo", attributes: ["tipo_id", "nome"] },
      { model: Photo, as: "photos", attributes: ["photo_id", "imageData"] },
    ],
  });
}

async function buscarImovelPorId(id) {
  const imovel = await Imovel.findByPk(id, {
    include: [
      { model: Estado, as: "estado", attributes: ["estado_id", "nome"] },
      { model: Cidade, as: "cidade", attributes: ["cidade_id", "nome"] },
      { model: Tipo, as: "tipo", attributes: ["tipo_id", "nome"] },
      { model: Photo, as: "photos", attributes: ["photo_id", "imageData"] },
    ],
  });

  if (!imovel) {
    throw new Error("Imóvel não encontrado");
  }

  return imovel;
}

async function criarImovel(dadosImovel) {
  return await Imovel.create(dadosImovel);
}

async function atualizarImovel(id, dadosAtualizados) {
  const imovel = await Imovel.findByPk(id);

  if (!imovel) {
    throw new Error("Imóvel não encontrado");
  }

  await imovel.update(dadosAtualizados);
  return imovel;
}

async function buscarImagensPorImovelId(imovelId) {
  return await Photo.findAll({
    where: { imovel_id: imovelId },
    attributes: ["photo_id", "imageData"],
  });
}

async function deletarImagem(photoId) {
  const imagem = await Photo.findByPk(photoId);

  if (!imagem) {
    throw new Error("Imagem não encontrada");
  }

  await imagem.destroy();
  return { message: "Imagem deletada com sucesso" };
}

async function deletarImovel(id) {
  const imovel = await Imovel.findByPk(id, {
    include: [{ model: Photo, as: "photos" }],
  });

  if (!imovel) {
    throw new Error("Imóvel não encontrado");
  }

  if (imovel.photos.length > 0) {
    await Photo.destroy({ where: { imovel_id: id } });
  }

  await imovel.destroy();
  return { message: "Imóvel deletado com sucesso" };
}

module.exports = {
  listarImovel,
  criarImovel,
  buscarImovelPorId,
  atualizarImovel,
  deletarImovel,
  buscarImagensPorImovelId,
  deletarImagem,
};
