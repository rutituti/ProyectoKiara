const { response } = require('express');
const express = require('express');
const { request } = require('http');
const path = require('path');
const router = express.Router();

//Rutas de operación 
router.get('/CronogramaVenta',(request, response, next) => {
    response.sendFile(path.join(__dirname,'..','views','html','crngrmVENTA.html'))
});
router.get('/iniciosesion',(request, response, next) => {
    response.sendFile(path.join(__dirname,'..','views','html','iniciar_Sesion.html'))
});
router.get('/CronogramaRenta',(request, response, next) => {
    response.send('Cronograma de la Renta');
});
router.get('/Expediente',(request, response, next) => {
    response.send('Mostar págiana de expediente');
});

module.exports = router;