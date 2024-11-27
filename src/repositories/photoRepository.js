const {Photo} = require('../model/Photo');
const { Imovel } = require('../model/Imovel');


async function listarPhotos() {
  return await Photo.findAll({
    include: [
      { model: Imovel, as: 'imovel', attributes: ['imovel_id','nome'] },
    ],
    order: [['data_cadastro', 'DESC']],  
  });
}

async function criarPhoto(dadosPhoto) {
  const {
    imovel_id,
    imageData,
  } = dadosPhoto;

  const photo = await Photo.create({
    imovel_id,
    imageData, 
  });

  return photo;
}



module.exports = {
  listarPhotos,
  criarPhoto,
};
