const { Photo } = require("../model/Photo");
const { Imovel } = require("../model/Imovel");

async function listarPhotos() {
  return await Photo.findAll({
    include: [
      { model: Imovel, as: "imovel", attributes: ["imovel_id", "nome"] },
    ],
    order: [["data_cadastro", "DESC"]],
  });
}

async function criarPhoto(dadosPhoto) {
  const { imovel_id, imageData } = dadosPhoto;

  const photo = await Photo.create({
    imovel_id,
    imageData,
  });

  return photo;
}

async function deletarPhoto(photo_id, imovel_id) {
  const photo = await Photo.findOne({ where: { photo_id, imovel_id } });

  if (!photo) {
    throw new Error("Foto não encontrada ou não pertence ao imóvel.");
  }

  await photo.destroy();
  return { message: "Foto excluída com sucesso!" };
}

module.exports = {
  listarPhotos,
  criarPhoto,
  deletarPhoto
};
