const cidadeRepository = require('../repositories/cidadeRepository');

function CidadeController() {

  async function getCidades(req, res) {
    try {
      const cidades = await cidadeRepository.listarCidades();

      if (cidades.length === 0) {
        return res.status(404).json({ error: 'Nenhuma cidade encontrada' });
      }

      res.json(cidades);
    } catch (error) {
      console.error('Erro ao obter cidades:', error);
      res.status(500).json({ error: 'Erro ao obter cidades' });
    }
  }

  async function getCidadeById(req, res) {
    try {
      const { id } = req.params;
      const cidade = await cidadeRepository.buscarCidadePorId(id);

      if (!cidade) {
        return res.status(404).json({ error: 'Cidade não encontrada' });
      }

      res.json(cidade);
    } catch (error) {
      console.error('Erro ao buscar cidade:', error);
      res.status(500).json({ error: 'Erro ao buscar cidade' });
    }
  }

  async function postCidade(req, res) {
    try {
      const { nome } = req.body;

      if (!nome) {
        return res.status(400).json({ error: 'O nome da cidade é obrigatório.' });
      }

      const novaCidade = await cidadeRepository.criarCidade({ nome });
      res.status(201).json(novaCidade);
    } catch (error) {
      console.error('Erro ao criar cidade:', error);
      res.status(500).json({ error: 'Erro ao criar cidade' });
    }
  }

  async function putCidade(req, res) {
    try {
      const { id } = req.params;
      const { nome } = req.body;

      if (!nome) {
        return res.status(400).json({ error: 'O nome da cidade é obrigatório.' });
      }

      const cidadeAtualizada = await cidadeRepository.atualizarCidade(id, { nome });
      res.json(cidadeAtualizada);
    } catch (error) {
      console.error('Erro ao atualizar cidade:', error);
      res.status(500).json({ error: 'Erro ao atualizar cidade' });
    }
  }

  async function deleteCidade(req, res) {
    try {
      const { id } = req.params;

      await cidadeRepository.deletarCidade(id);
      res.json({ message: 'Cidade deletada com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar cidade:', error);
      res.status(500).json({ error: 'Erro ao deletar cidade' });
    }
  }

  return {
    getCidades,
    getCidadeById,
    postCidade,
    putCidade,
    deleteCidade,
  };
}

module.exports = CidadeController;
