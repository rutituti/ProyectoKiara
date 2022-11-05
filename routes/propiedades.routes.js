const express = require('express');

const router = express.Router();

const propiedadController=require("../controllers/propiedad.controller");


router.get('/buscar/:valor_busqueda', propiedadController.get_buscar); // buscar nueva propiedad
router.get('/new/propiety',propiedadController.new_propiety); // Registrar nueva propiedad

module.exports = router;