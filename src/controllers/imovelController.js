const imovelRepository = require('../repositories/imovelRepository');
const sharp = require('sharp');
const s3 = require('../utils/awsConfig'); 
const { v4: uuidv4 } = require('uuid');

function ImovelController() {
  
    async function getImovel(req, res) {
      try {
        const imoveis = await imovelRepository.listarImovel();
    
        if (imoveis.length === 0) {
          return res.status(404).json({ error: 'Nenhum imóvel encontrado' });
        }
    
        res.json(imoveis);
      } catch (error) {
        console.error('Erro ao obter imóveis:', error);
        res.status(500).json({ error: 'Erro ao obter imóveis' });
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


  async function postImovel(req, res) {
    try {
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
        imagemBase64,
      } = req.body;
  
  
      const imagemBuffer = Buffer.from(imagemBase64.split(',')[1], 'base64');
  
      const imagemComprimida = await compressImage(imagemBuffer);
  
      const uniqueFileName = `${uuidv4()}.jpg`;

      const imageUrl = await uploadToS3(imagemComprimida, uniqueFileName);

      console.log("AQUIIII " + JSON.stringify(imageUrl));
  
      const novoImovel = await imovelRepository.criarImovel({
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
        imageData: imageUrl,
      });
  
      res.json({ message: `Imóvel ${nome} cadastrado com sucesso!`, imovel: novoImovel });
    } catch (error) {
      console.error('Erro ao cadastrar imóvel:', error);
      res.status(500).json({ error: 'Erro ao cadastrar imóvel' });
    }
  }
  

  async function getImovelById(req, res) {
    try {
      const { id } = req.params;
      const imovel = await imovelRepository.buscarImovelPorId(id);

      if (!imovel) {
        return res.status(404).json({ error: 'Imóvel não encontrado' });
      }

      const imageBase64 = imovel.imageData
        ? Buffer.from(imovel.imageData).toString('base64')
        : null;

      res.json({
        ...imovel.toJSON(),
        image: imageBase64 ? `data:image/png;base64,${imageBase64}` : null,
      });
    } catch (error) {
      console.error('Erro ao buscar imóvel:', error);
      res.status(500).json({ error: 'Erro ao buscar imóvel' });
    }
  }

  async function putImovel(req, res) {
    try {
      const { id } = req.params;
      const { nome, description, valor, valor_condominio, n_quartos, n_banheiros, n_vagas, tipo_id, cidade_id, estado_id } = req.body;
      const imagemBase64 = req.file ? req.file.buffer : null;

      const dadosAtualizados = { nome, description, valor, valor_condominio, n_quartos, n_banheiros, n_vagas, tipo_id, cidade_id, estado_id };

      if (imagemBase64) {
        dadosAtualizados.imageData = await compressImage(imagemBase64);
      }

      const imovelAtualizado = await imovelRepository.atualizarImovel(id, dadosAtualizados);

      res.json({ message: 'Imóvel atualizado com sucesso!', imovel: imovelAtualizado });
    } catch (error) {
      console.error('Erro ao atualizar imóvel:', error);
      res.status(500).json({ error: 'Erro ao atualizar imóvel' });
    }
  }

  async function deleteImovel(req, res) {
    try {
      const { id } = req.params;

      await imovelRepository.deletarImovel(id);

      res.json({ message: 'Imóvel excluído com sucesso!' });
    } catch (error) {
      console.error('Erro ao excluir imóvel:', error);
      res.status(500).json({ error: 'Erro ao excluir imóvel' });
    }
  }

  return {
    getImovel,
    postImovel,
    getImovelById,
    putImovel,
    deleteImovel,
  };
}

module.exports = ImovelController;