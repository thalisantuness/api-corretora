const photoRepository = require('../repositories/photoRepository');
const sharp = require('sharp');
const s3 = require('../utils/awsConfig'); 
const { v4: uuidv4 } = require('uuid');

function PhotoController() {
  
    async function getPhoto(req, res) {
      try {
        const photo = await photoRepository.listarPhotos();
    
        if (photo.length === 0) {
          return res.status(404).json({ error: 'Nenhuma foto encontrado' });
        }
    
        res.json(photo);
      } catch (error) {
        console.error('Erro ao obter photos:', error);
        res.status(500).json({ error: 'Erro ao obter photos' });
      }
    }


  async function compressImage(buffer) {
    return sharp(buffer)
      .resize(500, 500) 
      .jpeg({ quality: 80 }) 
      .toBuffer();
  }

  async function uploadToS3(buffer, fileName) {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME, 
      Key: `imoveis/${fileName}`,
      Body: buffer,
      ContentType: 'image/jpeg', 
      ACL: 'public-read', 
    };
  
    const result = await s3.upload(params).promise();

    return result.Location;
  }


  async function postPhoto(req, res) {
    try {
      const {
        imovel_id,
        imagemBase64,
      } = req.body;
  
  
      const imagemBuffer = Buffer.from(imagemBase64.split(',')[1], 'base64');
  
      const imagemComprimida = await compressImage(imagemBuffer);
  
      const uniqueFileName = `${uuidv4()}.jpg`;

      const imageUrl = await uploadToS3(imagemComprimida, uniqueFileName);

      console.log("AQUIIII " + JSON.stringify(imageUrl));
  
      const novoPhoto = await photoRepository.criarPhoto({
        imovel_id,
        imageData: imageUrl,
      });
  
      res.json({ message: `Photo cadastrada com sucesso!`, photo: novoPhoto });
    } catch (error) {
      console.error('Erro ao cadastrar photo:', error);
      res.status(500).json({ error: 'Erro ao cadastrar imóvel' });
    }
  }

  async function deletePhoto(req, res) {
    try {
      const { id } = req.params; // ID da foto
      const { imovel_id } = req.body; // ID do imóvel vindo do body
  
      if (!imovel_id) {
        return res.status(400).json({ error: "O ID do imóvel é obrigatório." });
      }
  
      const resultado = await photoRepository.deletarPhoto(id, imovel_id);
  
      res.json(resultado);
    } catch (error) {
      console.error('Erro ao deletar foto:', error);
      res.status(500).json({ error: error.message || 'Erro ao excluir a foto.' });
    }
  }

  

  return {
    getPhoto,
    postPhoto,
    deletePhoto,
  };
}

module.exports = PhotoController;