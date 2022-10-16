const express = require('express');

const router = express.Router();

const inicioControllers = require("../controllers/inicio.controller");
const sesionController = require("../controllers/registrar_usuario.controller");
const acontroller = require("../controllers/a_controller");
const bcontroller = require("../controllers/b_controller");

router.post('/sesion',sesionController.postNew);
router.use('/sesion',sesionController.inicio);
router.use('/fail',sesionController.fail);
router.use('/success',sesionController.exito);

router.get('/QuienesSomos', inicioControllers.get_Infoempresa); //Muestra la informacion de la empresa

router.get('/perfil', inicioControllers.getperfil); //Muestra la informacion del usuario

router.get('/propiedades/venta', inicioControllers.get_casas_venta); //Mostrar casas en venta

router.get('/propiedades/renta', inicioControllers.get_casas_renta); //Mostrar casas en renta

router.get('/propiedades/new', inicioControllers.get_new); //Formulario registro de propiedad

router.get('/propiedades', inicioControllers.get_casas); //Mostrar listado de propiedades totales

router.get('/sesion', sesionController.Validar) //Mostrar Inicio de Sesion
//router.get('/registrarse', sesionController.getNew) //Mostrar Inicio de Sesion
//router.get('/registrarse', sesionController.postNew) //Mostrar Inicio de Sesion

// Mandar pagina de inicio
router.get('/', inicioControllers.get_root );

module.exports = router;