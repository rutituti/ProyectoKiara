const express = require('express');

const router = express.Router();

const userController = require("../controllers/usuario.controller");
const propiedadController = require("../controllers/propiedad.controller")

const isAuth = require('../util/is-auth');

router.post('/new/admin',userController.post_new_admin);

router.get('/new/admin',isAuth, userController.get_new_admin);

router.post('/new/cliente',userController.post_new_cliente);

router.get('/new/cliente', userController.get_new_cliente);

router.post('/new/asesor',userController.post_new_asesor);

router.get('/new/asesor', userController.get_new_asesor); //ruta nuevo asesor

router.get('/login', userController.get_login);

router.post('/login', userController.post_login);

router.get('/logout', userController.logout);

router.get('/listAsesor', userController.get_listAsesor); //Lista de asesores

router.get('/listCliente', userController.get_listCliente); //Lista de clientes

router.get('/perfil',isAuth, userController.get_profile); //Mostrar perfil de usuario

router.get('/perfil/propiedad', propiedadController.get_newProperty); //El perfil principal crea nuevas propiedades (Asesores)

router.post('/deleteA', userController.post_deleteAsesor); //Ruta borrar asesor

router.post('/deleteC', userController.post_deleteCliente); //Ruta borrar cliente

router.post('/deleteU', userController.post_deleteUsuario); //Ruta borrar usuario

module.exports = router;