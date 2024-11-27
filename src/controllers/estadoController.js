const estadoRepository = require('../repositories/estadoRepository');

function EstadoController() {

  async function getEstados(req, res) {
    try {
      const estados = await estadoRepository.listarEstados();

      if (estados.length === 0) {
        return res.status(404).json({ error: 'Nenhum estado encontrado' });
      }

      res.json(estados);
    } catch (error) {
      console.error('Erro ao obter estados:', error);
      res.status(500).json({ error: 'Erro ao obter estados' });
    }
  }


  async function getEstadoById(req, res) {
    try {
      const { id } = req.params;
      const estado = await estadoRepository.buscarEstadoPorId(id);

      if (!estado) {
        return res.status(404).json({ error: 'Estado não encontrado' });
      }

      res.json(estado);
    } catch (error) {
      console.error('Erro ao buscar estado:', error);
      res.status(500).json({ error: 'Erro ao buscar estado' });
    }
  }

  async function postEstado(req, res) {
    try {
      const { nome } = req.body;

      if (!nome) {
        return res.status(400).json({ error: 'O nome do estado é obrigatório.' });
      }

      const novoEstado = await estadoRepository.criarEstado({ nome });
      res.status(201).json(novoEstado);
    } catch (error) {
      console.error('Erro ao criar estado:', error);
      res.status(500).json({ error: 'Erro ao criar estado' });
    }
  }

  async function putEstado(req, res) {
    try {
      const { id } = req.params;
      const { nome } = req.body;

      if (!nome) {
        return res.status(400).json({ error: 'O nome do estado é obrigatório.' });
      }

      const estadoAtualizado = await estadoRepository.atualizarEstado(id, { nome });
      res.json(estadoAtualizado);
    } catch (error) {
      console.error('Erro ao atualizar estado:', error);
      res.status(500).json({ error: 'Erro ao atualizar estado' });
    }
  }

  async function deleteEstado(req, res) {
    try {
      const { id } = req.params;

      await estadoRepository.deletarEstado(id);
      res.json({ message: 'Estado deletado com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar estado:', error);
      res.status(500).json({ error: 'Erro ao deletar estado' });
    }
  }

  return {
    getEstados,
    getEstadoById,
    postEstado,
    putEstado,
    deleteEstado,
  };
}

module.exports = EstadoController;
