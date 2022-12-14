const express = require('express');

const router = express.Router();

const userController = require("../controllers/usuario.controller");

const isAuth = require('../util/is-auth');

router.post('/new/admin',userController.post_new_admin);

router.get('/new/admin', userController.get_new_admin);

router.post('/new/cliente',userController.post_new_cliente);

router.get('/new/cliente', userController.get_new_cliente);

router.get('/login', userController.get_login);

router.post('/login', userController.post_login);

router.get('/logout', userController.logout);

router.get('/perfil',isAuth, userController.get_profile); //Mostrar perfil de usuario

module.exports = router;