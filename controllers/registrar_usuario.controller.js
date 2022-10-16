const { info } = require('console');
const exp = require('constants');
const { response } = require('express');
const { request } = require('http');
const path = require('path');
const Usuario = require('../models/usuario.model');
// metodos del controlador
exports.inicio = (request, response, next) => {
    response.render('form');
}
exports.postNew = (request,response,next) => {
    const usuario = new Usuario(request.body.Nombres,request.body.primerApellido,request.body.segundoApellido,request.body.email,request.body.telefono,request.body.ocupacion,request.body.estado)
    console.log(usuario);
    usuario.save()
    .then(() => {
        response.redirect('/inicio/success');
        return
    })
    .catch((error) => {
        console.log(error);
        response.redirect('/inicio/fail')
    });
}
exports.fail = (request, response, next) => {
    response.render('fail');
}
exports.exito = (request, response,next) => {
    response.render('exito')
}
exports.getNew = (request, response, next) => {
    response.render('..','views','registro','new.ejs');
    
    //response.setHeader('Set-Cookie', 'Cookie de chocolate','1');  //Enviar una cookie
};
exports.Validar = (request, response, next) => {
    response.render(path.join('..','views','includes','inicio_sesion','sesion.ejs'),{
        info: '',
    });
    
    //response.setHeader('Set-Cookie', 'Cookie de chocolate','1');  //Enviar una cookie
};