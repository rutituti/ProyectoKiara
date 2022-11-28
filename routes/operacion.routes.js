
const express = require('express');

const segControllers = require("../controllers/operacion.controller");
const isAuth = require('../util/is-auth');
const router = express.Router();

//Rutas de seguimiento 

//router.get('/configuraciones',isAuth, segControllers.get_config); //Mostrar pagina de configuracion
router.get('/new',isAuth, segControllers.post_new_proceso);

router.get('/misprocesos',isAuth, segControllers.get_procesos);// despliega las propiedades de una operacion asignada al asesor

router.get('/misclientes/:operacion/:cliente',isAuth, segControllers.get_operacion_asesor);// despliega las propiedades de una operacion asignada al asesor

router.get('/misclientes',isAuth, segControllers.get_mis_clientes);//Muestra todos los clientes asignados a un asesor

router.post('/seguimiento/update',isAuth, segControllers.update_seg); //Mostrarcronograma, registro de expediente y expediente personal

router.get ('/:operacion/seguimiento/:id_p',isAuth, segControllers.get_seg);// Seguimiento cliente

router.get ('/:operacion/seguimiento/:id_p/expediente/:tipo_exp/:nombre_doc',isAuth, segControllers.get_vistasdocs);

router.post('/:operacion/seguimiento/:id_p/expediente/:tipo_exp/:nombre_doc',isAuth, segControllers.post_docs);

router.get('/:operacion/seguimiento/:cliente/:id_p',isAuth, segControllers.get_seg);//Seguimiento para editar


router.get('/:operacion/seguimiento/:cliente/:id_p',isAuth, segControllers.get_seg);
router.post('/seguimiento/update2',isAuth, segControllers.post_updateseg);


router.get ('/:operacion/seguimiento/:id_p/expedienteprop/:tipo_expProp/:nombre_docProp',isAuth, segControllers.get_vistasdocsProp);

router.post('/:operacion/seguimiento/:id_p/expedienteprop/:tipo_expProp/:nombre_docProp',isAuth, segControllers.post_docsProp);

router.get ('/:operacion/',isAuth, segControllers.get_operacion); //Mostrar pestañas Cronograma Venta - Expediente - Mis propiedades

router.get('/:operacion/:cliente',isAuth, segControllers.get_operacion); //Mostrar propiedades de diferentes operaciones del usuario cliente






module.exports = router;