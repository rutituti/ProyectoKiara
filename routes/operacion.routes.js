
const express = require('express');

const segControllers = require("../controllers/operacion.controller");
const isAuth = require('../util/is-auth');
const router = express.Router();

//Rutas de seguimiento 

router.get('/configuraciones',isAuth, segControllers.get_config); //Mostrar pagina de configuracion

router.get('/arrendamiento/alquilar',isAuth, segControllers.get_alquilar); //Mostrar pestañas Cronograma Venta - Expediente - Mis favoritos

router.get('/arrendamiento/arrendar',isAuth, segControllers.get_arrendar); //Mostrar pestañas Cronograma Renta - Expediente - Mis propiedades

router.get('/venta/:id_c/:id_p',isAuth, segControllers.get_segV);

router.get('/:operacion/',isAuth, segControllers.get_venta); //Mostrar pestañas Cronograma Venta - Expediente - Mis propiedades

router.get('/perfil',isAuth, segControllers.get_profile); //Mostrar perfil de usuario

//router.get('/',isAuth, segControllers.get_root ); // ¿Que mostraremos en la raiz?


module.exports = router;