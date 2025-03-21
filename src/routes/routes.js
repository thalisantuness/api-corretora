const express = require("express");
const router = express.Router();
router.use(express.json());

const UsuarioController = require("../controllers/usuariosController");
const ImovelController = require("../controllers/imovelController");
const EstadoController = require("../controllers/estadoController");
const CidadeController = require("../controllers/cidadeController");
const TipoController = require("../controllers/tipoController"); 
const PhotoController = require("../controllers/photoController");
const authMiddleware = require("../middleware/auth");
const upload = require("../utils/multer");

const usuariosController = UsuarioController();
const imovelController = ImovelController();
const estadoController = EstadoController();
const cidadeController = CidadeController();  
const tipoController = TipoController(); 
const photoController = PhotoController();

router.get('/usuarios', usuariosController.visualizarUsuario);
router.post('/usuarios', usuariosController.cadastrar);
router.post('/usuarios/login', usuariosController.logar);

router.get('/imovel', imovelController.getImovel);
router.get('/imovel/:id', imovelController.getImovelById);
router.post('/imovel', upload, imovelController.postImovel);
router.put('/imovel/:id', upload, imovelController.putImovel); 
router.delete('/imovel/:id', imovelController.deleteImovel); 

router.get('/estados', estadoController.getEstados);
router.get('/estados/:id', estadoController.getEstadoById); 
router.post('/estados', estadoController.postEstado);
router.put('/estados/:id', estadoController.putEstado); 
router.delete('/estados/:id', estadoController.deleteEstado);

router.get('/cidades', cidadeController.getCidades);  
router.get('/cidades/:id', cidadeController.getCidadeById); 
router.post('/cidades', cidadeController.postCidade); 
router.put('/cidades/:id', cidadeController.putCidade);  
router.delete('/cidades/:id', cidadeController.deleteCidade);  

router.get('/tipos', tipoController.getTipos);  
router.get('/tipos/:id', tipoController.getTipoById); 
router.post('/tipos', tipoController.postTipo); 
router.put('/tipos/:id', tipoController.putTipo);  
router.delete('/tipos/:id', tipoController.deleteTipo);  

router.get('/photo', photoController.getPhoto);  
router.post('/photo', photoController.postPhoto); 
router.delete('/photo/:id', photoController.deletePhoto);


router.use(authMiddleware);

router.use('*', (req, res) => {
  res.status(404).json({ errorMessage: 'Rota não encontrada' });
});

module.exports = router;
