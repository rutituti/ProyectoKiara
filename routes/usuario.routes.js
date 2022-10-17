const express = require('express');

const router = express.Router();

const userController = require("../controllers/usuario.controller");

router.post('/registrarse',userController.post_new);

router.get('/registrarse', userController.get_new);

router.get('/login', userController.get_login);

router.post('/login', userController.post_login);

router.get('/logout', userController.logout);

module.exports = router;