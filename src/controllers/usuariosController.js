const { Usuario } = require("../model/Usuarios");
const usuariosRepository = require("../repositories/usuariosRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");
const sharp = require("sharp");

function UsuarioController() {
  async function visualizarUsuario(req, res) {
    try {
      const usuarios = await usuariosRepository.listarUsuarios();

      if (usuarios.length === 0) {
        return res.status(404).json({ error: "Nenhum usuário encontrado" });
      }

      const usuariosComImagem = usuarios.map((usuario) => {
        const imageBase64 = usuario.imageData
          ? Buffer.from(usuario.imageData).toString("base64")
          : null;

        return {
          ...usuario.toJSON(),
          image: imageBase64 ? `data:image/png;base64,${imageBase64}` : null,
        };
      });

      res.json(usuariosComImagem);
    } catch (error) {
      console.error("Erro ao obter usuários:", error);
      res.status(500).json({ error: "Erro ao obter usuários" });
    }
  }

  async function cadastrar(req, res) {
    const { nome, email, senha } = req.body;
    try {
      await usuariosRepository.criarUsuario({ nome, email, senha });
      res.json({ message: `Usuário ${nome} cadastrado com sucesso` });
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      res
        .status(500)
        .json({
          errorMessage: "Erro ao cadastrar usuário",
          error: error.message,
        });
    }
  }

  async function logar(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res
          .status(400)
          .json({ message: "Email e senha são obrigatórios." });
      }

      const user = await Usuario.findOne({ where: { email: email } });

      if (!user) {
        return res.status(401).json({ message: "Email não encontrado." });
      }

      const isMatch = await bcrypt.compare(senha, user.senha);

      if (!isMatch) {
        return res.status(401).json({ message: "Senha incorreta." });
      }

      const token = jwt.sign(
        {
          usuario_id: user.usuario_id,
          role: user.role,
        },
        authConfig.secret,
        { expiresIn: 86400 }
      );

      res.send({ user, token });
    } catch (error) {
      console.error("Erro ao autenticar usuário:", error);
      res
        .status(500)
        .json({
          errorMessage: "Erro ao autenticar usuário",
          error: error.message,
        });
    }
  }

  return {
    visualizarUsuario,
    cadastrar,
    logar,
  };
}

module.exports = UsuarioController;
