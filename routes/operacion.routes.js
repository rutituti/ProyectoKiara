
const express = require('express');

const segControllers = require("../controllers/operacion.controller");
const isAuth = require('../util/is-auth');
const router = express.Router();

//Rutas de seguimiento 

//router.get('/configuraciones',isAuth, segControllers.get_config); //Mostrar pagina de configuracion

router.get ('/:operacion/seguimiento/:id_p',isAuth, segControllers.get_seg);
router.get ('/:operacion/expediente',isAuth, segControllers.get_segexp);
router.get ('/:operacion/expediente/:tipo_exp/:nombre_doc',isAuth, segControllers.get_vistasdocs);
router.post('/:operacion/expediente/:tipo_exp/:nombre_doc',isAuth, segControllers.post_docs);
router.get ('/:operacion/',isAuth, segControllers.get_operacion); //Mostrar pestañas Cronograma Venta - Expediente - Mis propiedades

//router.get('/',isAuth, segControllers.get_root ); // ¿Que mostraremos en la raiz?


module.exports = router;