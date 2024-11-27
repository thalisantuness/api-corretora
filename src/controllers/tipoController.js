const tipoRepository = require('../repositories/tipoRepository');

function TipoController() {

  async function getTipos(req, res) {
    try {
      const tipos = await tipoRepository.listarTipos();

      if (tipos.length === 0) {
        return res.status(404).json({ error: 'Nenhum tipo encontrado' });
      }

      res.json(tipos);
    } catch (error) {
      console.error('Erro ao obter tipos:', error);
      res.status(500).json({ error: 'Erro ao obter tipos' });
    }
  }

  async function getTipoById(req, res) {
    try {
      const { id } = req.params;
      const tipo = await tipoRepository.buscarTipoPorId(id);

      if (!tipo) {
        return res.status(404).json({ error: 'Tipo não encontrado' });
      }

      res.json(tipo);
    } catch (error) {
      console.error('Erro ao buscar tipo:', error);
      res.status(500).json({ error: 'Erro ao buscar tipo' });
    }
  }

  async function postTipo(req, res) {
    try {
      const { nome } = req.body;

      if (!nome) {
        return res.status(400).json({ error: 'O nome do tipo é obrigatório.' });
      }

      const novoTipo = await tipoRepository.criarTipo({ nome });
      res.status(201).json(novoTipo);
    } catch (error) {
      console.error('Erro ao criar tipo:', error);
      res.status(500).json({ error: 'Erro ao criar tipo' });
    }
  }

  async function putTipo(req, res) {
    try {
      const { id } = req.params;
      const { nome } = req.body;

      if (!nome) {
        return res.status(400).json({ error: 'O nome do tipo é obrigatório.' });
      }

      const tipoAtualizado = await tipoRepository.atualizarTipo(id, { nome });
      res.json(tipoAtualizado);
    } catch (error) {
      console.error('Erro ao atualizar tipo:', error);
      res.status(500).json({ error: 'Erro ao atualizar tipo' });
    }
  }

  async function deleteTipo(req, res) {
    try {
      const { id } = req.params;

      await tipoRepository.deletarTipo(id);
      res.json({ message: 'Tipo deletado com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar tipo:', error);
      res.status(500).json({ error: 'Erro ao deletar tipo' });
    }
  }

  return {
    getTipos,
    getTipoById,
    postTipo,
    putTipo,
    deleteTipo,
  };
}

module.exports = TipoController;
