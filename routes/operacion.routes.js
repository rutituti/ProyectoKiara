
const express = require('express');

const segControllers = require("../controllers/operacion.controller");
const isAuth = require('../util/is-auth');
const router = express.Router();

//Rutas de seguimiento 

router.get('/configuraciones',isAuth, segControllers.get_config); //Mostrar pagina de configuracion

//router.get('/alquilar/',isAuth, segControllers.get_alquilar); //Mostrar pestañas Cronograma Venta - Expediente - Mis favoritos

//router.get('/comprar/',isAuth, segControllers.get_arrendar); //Mostrar pestañas Cronograma Renta - Expediente - Mis propiedades

router.get('/:operacion/seguimiento/:id_p',isAuth, segControllers.get_seg);

router.get('/:operacion/',isAuth, segControllers.get_operacion); //Mostrar pestañas Cronograma Venta - Expediente - Mis propiedades

router.get('/:operacion/expediente',isAuth, segControllers.get_segexp);

//router.get('/',isAuth, segControllers.get_root ); // ¿Que mostraremos en la raiz?


module.exports = router;