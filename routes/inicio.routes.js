const express = require('express');

const router = express.Router();

const inicioControllers = require("../controllers/inicio.controller");
const acontroller = require("../controllers/a_controller");
const bcontroller = require("../controllers/b_controller");

router.get('/QuienesSomos', inicioControllers.get_Infoempresa); //Muestra la informacion de la empresa

router.get('/propiedades/venta', inicioControllers.get_casas_venta); //Mostrar casas en venta

router.get('/propiedades/renta', inicioControllers.get_casas_renta); //Mostrar casas en renta

//router.get('/propiedades/new', inicioControllers.get_new); //Formulario registro de propiedad

router.get('/propiedades/new', acontroller.getCliente); //Formulario registro de propiedad, obtner propiedades
router.get('/propiedades/new', acontroller.post_new); //Formulario registro de propiedad

router.get('/muestra/cliente',bcontroller.getClientes);  // muestra cliente prototipo hay que borrarla solo comprueba el fuc BD

router.get('/propiedades', inicioControllers.get_casas); //Mostrar listado de propiedades totales

router.get('/sesion', inicioControllers.get_sesion) //Mostrar Inicio de Sesion

// Mandar pagina de inicio
router.get('/', inicioControllers.get_root );

module.exports = router;