const { Usuario } = require('../model/Usuarios');
const bcrypt = require('bcrypt');

async function listarUsuarios() {
  return Usuario.findAll();
}

async function criarUsuario(dadosUsuario) {
  const { nome, email, senha, imageData } = dadosUsuario;

  if (!senha) {
    throw new Error('Senha é obrigatória');
  }

  const usuarioExistente = await Usuario.findOne({ where: { email } });
  if (usuarioExistente) {
    throw new Error('Usuário com este email já existe');
  }

  const senhaHash = await bcrypt.hash(senha, 10);

  const usuario = await Usuario.create({
    nome,
    email,
    senha: senhaHash,
    pontos: 0
  });

  return usuario;
}

async function buscarUsuario(email) {
  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario) {
    throw new Error('Usuário não encontrado');
  }
  return usuario;
}

module.exports = {
  listarUsuarios,
  criarUsuario,
  buscarUsuario
};
