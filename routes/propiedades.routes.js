const express = require('express');

const router = express.Router();

const propiedadController=require("../controllers/propiedad.controller");

router.get('/buscar/:valor_busqueda', propiedadController.get_buscar);