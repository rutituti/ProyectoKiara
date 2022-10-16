const express = require('express');

const router = express.Router();

const inicioControllers = require("../controllers/inicio.controller");

router.get('/QuienesSomos', inicioControllers.get_Infoempresa); //Muestra la informacion de la empresa


// /user/mispropiedades

router.get('/propiedades/venta', inicioControllers.get_casas_venta); //Mostrar casas en venta

router.get('/propiedades/renta', inicioControllers.get_casas_renta); //Mostrar casas en renta

router.get('/propiedades/new', inicioControllers.get_new); //Formulario registro de propiedad

router.get('/propiedades', inicioControllers.get_casas); //Mostrar listado de propiedades totales

// Mandar pagina de inicio
router.get('/', inicioControllers.get_root );

module.exports = router;