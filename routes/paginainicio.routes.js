const { response } = require('express');
const express = require('express');
const { request } = require('http');
const router = express.Router();
const path = require('path');


//Ruta 1 quienes somos
/*router.get('/QuieneSomos',(request, response,next) =>{
    let html = '<!DOCTYPE>';
    html += "<h1>¿Quienes somos?</h1>";
    html += "<p> Somos una empresa dedicada a la venta de inmuebles con el fin de mejor la"
    html += "vida de las personas, haciendo realidad sus sueños</p>"
    response.send(html); // HTML Informacion de la empresa
});*/
// Quiero mandar mi index
router.get('/QuieneSomos',(request, response, next) => {
    response.sendFile(path.join(__dirname,'..','Previous','frontend','index.html'))
});
// Mandar pagina de inicio
router.get('/Kiara',(request, response, next) => {
    response.sendFile(path.join(__dirname,'..','views','html','pagina_inicio.html'))
});

//Implementacion de rutas
router.get('/perfil',(request, response, next) => {
    response.send('Perfil de Usuario') //Aqui va el html del perfil de usuario
});
router.get('/formulario',(request, response, next) => {
    response.sendFile(path.join(__dirname,'..','Previous','frontend','formulario.html'))
});
// Ruta con EJS
//router.get('/formulario',(request, response, next) => {
//    response.render('new.ejs',{entero: 100})
//});
router.get('/Comprar',(request, response, next) => {
    response.send('Compra tu casa') //HTML de casas en venta
});
router.get('/Rentar',(request, response, next) => {
    response.send('Renta tu casa') //HTML de casas en renta
});
router.use('/casas',(request, response, next) => { //Aun no me queda claro para que es el body-parser
    console.log(request.body) //HTML de casas 
});

module.exports = router;