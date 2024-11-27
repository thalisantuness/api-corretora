const imovelRepository = require('../repositories/imovelRepository');
const sharp = require('sharp');

function ImovelController() {
  async function getImovel(req, res) {
    try {
      const imoveis = await imovelRepository.listarImovel();

      if (imoveis.length === 0) {
        return res.status(404).json({ error: 'Nenhum imóvel encontrado' });
      }

      const imoveisComImagem = imoveis.map(imovel => {
        const imageBase64 = imovel.imageData
          ? Buffer.from(imovel.imageData).toString('base64')
          : null;

        return {
          ...imovel.toJSON(),
          image: imageBase64 ? `data:image/png;base64,${imageBase64}` : null,
        };
      });

      res.json(imoveisComImagem);
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

  async function postImovel(req, res) {
    try {
      const { nome, description, valor, valor_condominio, n_quartos, n_banheiros, n_vagas, tipo_id, cidade_id, estado_id } = req.body;
      const imagemBase64 = req.file ? req.file.buffer : null;

      if (!nome || !imagemBase64) {
        return res.status(400).json({ error: 'Nome e imagem são obrigatórios.' });
      }

      const imagemComprimida = await compressImage(imagemBase64);
      const imageData = imagemComprimida;

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
        imageData,
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