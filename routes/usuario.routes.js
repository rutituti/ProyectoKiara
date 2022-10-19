const express = require('express');

const router = express.Router();

const userController = require("../controllers/usuario.controller");

const isAuth = require('../util/is-auth');

router.post('/new/admin',userController.post_new_admin);

router.get('/new/admin', userController.get_new_admin);

router.post('/new/cliente',isAuth,userController.post_new_cliente);

router.get('/new/cliente',isAuth, userController.get_new_cliente);

router.get('/login', userController.get_login);

router.post('/login', userController.post_login);

router.get('/logout', userController.logout);

module.exports = router;