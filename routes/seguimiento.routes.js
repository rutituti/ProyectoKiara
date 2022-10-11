const express = require('express');

const router = express.Router();

const segControllers = require("../controllers/seguimiento.controller");

//Rutas de seguimiento 

router.get('/configuraciones', segControllers.get_config); //Mostrar pagina de configuracion

router.get('/arrendamiento/alquilar', segControllers.get_alquilar); //Mostrar pestañas Cronograma Venta - Expediente - Mis favoritos

router.get('/arrendamiento/arrendar', segControllers.get_arrendar); //Mostrar pestañas Cronograma Renta - Expediente - Mis propiedades

router.get('/venta', segControllers.get_venta); //Mostrar pestañas Cronograma Venta - Expediente - Mis propiedades

router.get('/perfil', segControllers.get_profile); //Mostrar perfil de usuario

router.get('/', segControllers.get_root ); // ¿Que mostraremos en la raiz?

module.exports = router;