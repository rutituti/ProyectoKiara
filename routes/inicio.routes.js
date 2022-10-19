const express = require('express');

const router = express.Router();

const inicioControllers = require("../controllers/inicio.controller");
const sesionController = require("../controllers/usuario.controller");
const operacionController = require("../controllers/operacion.controller");


/*
router.use('/registrarse',sesionController.inicio);
router.use('/fail',sesionController.fail);
router.use('/success',sesionController.exito);
*/
router.get('/QuienesSomos', inicioControllers.get_Infoempresa); //Muestra la informacion de la empresa

router.get('/perfil/:user', operacionController.get_profile); //Muestra la informacion del cliente

router.get('/propiedades/venta', inicioControllers.get_casas_venta); //Mostrar casas en venta

router.get('/propiedades/renta', inicioControllers.get_casas_renta); //Mostrar casas en renta

router.get('/propiedades/new', inicioControllers.get_new); //Formulario registro de propiedad

router.get('/propiedades', inicioControllers.get_casas); //Mostrar listado de propiedades totales

router.get('/propiedades', inicioControllers.get_casas); //Mostrar listado de propiedades totales




/*
router.get('/sesion', sesionController.getSesion) //Mostrar Inicio de Sesion
router.get('/sesion',sesionController.login)
*/
// Mandar pagina de inicio
router.get('/', inicioControllers.get_root );

module.exports = router;