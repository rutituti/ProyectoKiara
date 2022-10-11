const express = require('express');

const router = express.Router();

const segControllers = require("../controllers/seguimiento.controller");

//Rutas de seguimiento 

router.get('/configuraciones', segControllers.get_config); //Mostrar casas en renta

router.get('/arrendamiento/solicitar', segControllers.get_alquilar); //Formulario registro de propiedad

router.get('/arrendamiento/arrendar', segControllers.get_arrendar); //Formulario registro de propiedad

router.get('/venta', segControllers.get_venta); //Mostrar listado de propiedades totales

router.get('/perfil', segControllers.get_profile); //Mostrar listado de propiedades totales

router.get('/', segControllers.get_root ); // ¿Que mostraremos en la raiz?

module.exports = router;