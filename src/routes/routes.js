const express = require("express");
const router = express.Router();
router.use(express.json()); 
const UsuarioController = require("../controllers/usuariosController");
const usuariosController = UsuarioController();
const authMiddleware = require("../middleware/auth");
const upload = require("../utils/multer")

// Rota para visualizar usuários
router.get('/usuarios', usuariosController.visualizarUsuario);

// Rota para cadastrar usuário (agora usando JSON com base64)
router.post('/usuarios', upload, usuariosController.cadastrar);

// Rota de login
router.post('/usuarios/login', usuariosController.logar);

// Rota com middleware de autenticação
router.use(authMiddleware);

// Rota de erro para rotas não encontradas
router.use('*', (req, res) => {
  res.status(404).json({ errorMessage: 'Rota não encontrada' });
});

module.exports = router;
