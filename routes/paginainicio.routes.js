const { response } = require('express');
const express = require('express');
const { request } = require('http');
const router = express.Router();
const path = require('path');



// Quiero mandar mi index
router.get('/QuienesSomos',(request, response, next) => {
    response.sendFile(path.join(__dirname,'..','views','html','temp.html'))
});
// Mandar pagina de inicio
router.get('/kiara',(request, response, next) => {
    response.sendFile(path.join(__dirname,'..','views','html','pagina_inicio.html'))
});

//Implementacion de rutas
router.get('/perfil',(request, response, next) => {
    response.send('Perfil de Usuario') //Aqui va el html del perfil de usuario
});
router.get('/formulario',(request, response, next) => {
    response.sendFile(path.join(__dirname,'..','views','html','formulario.html'))
});

router.get('/comprar',(request, response, next) => {
    response.send('Compra tu casa') //HTML de casas en venta
});
router.get('/rentar',(request, response, next) => {
    response.send('Renta tu casa') //HTML de casas en renta
});
router.use('/casas',(request, response, next) => { //Aun no me queda claro para que es el body-parser
    console.log(request.body) //HTML de casas 
});

module.exports = router;