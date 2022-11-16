
const express = require('express');

const segControllers = require("../controllers/operacion.controller");
const isAuth = require('../util/is-auth');
const router = express.Router();

//Rutas de seguimiento 

//router.get('/configuraciones',isAuth, segControllers.get_config); //Mostrar pagina de configuracion

router.get('/misclientes',isAuth, segControllers.get_mis_clientes);

router.post('/seguimiento/update',isAuth, segControllers.update_seg);

router.get('/:operacion/seguimiento/:id_p',isAuth, segControllers.get_seg);

router.get('/:operacion/seguimiento/:cliente/:id_p',isAuth, segControllers.get_seg);

router.get('/:operacion/',isAuth, segControllers.get_operacion); //Mostrar pestañas Cronograma Venta - Expediente - Mis propiedades

router.get('/:operacion/expediente',isAuth, segControllers.get_segexp);

router.post('/:operacion/expediente',isAuth, segControllers.post_exp);

router.get('/:operacion/:cliente',isAuth, segControllers.get_operacion);




module.exports = router;