const { info } = require('console');
const exp = require('constants');
const { response } = require('express');
const { request } = require('http');
const path = require('path');
const Usuario = require('../models/usuario.model');
// metodos del controlador
exports.inicio = (request, response, next) => {
    response.render(path.join('form'));
}
exports.postNew = (request,response,next) => {
    const usuario = new Usuario(request.body.Nombres,request.body.primerApellido,request.body.segundoApellido,request.body.telefono,request.body.email,request.body.ocupacion,request.body.estado,request.body.contra,request.body.username)
    request.session = usuario.Nombres;
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
    usuario.saveUsuario()
    .then(() => {
        request.session = usuario.username;
        console.log(request.session)
        return
    })
    .catch((error) => {
        console.log(error);
        response.redirect('/inicio/fail')
    });
}
exports.getSesion = (request,response, next) => {
    //let info = request.session.info ? request.session.info : '';
    //request.session.info = '';
    response.render(path.join('inicio_sesion','sesion.ejs') /*,{info: info,}*/);
}
exports.login = (request, response, next) => {
    Usuario.getUser(request.body.email)
    .then(([email, fieldData]) => {
        if(email.length < 1){
            request.session.info = 'El usuario y/o contraseña son incorrectos';
            response.redirect('/inicio/sesion');
        }else{
            console.log("bcrypt");
            bcrypt.compare(request.body.contra, usuario[0].contra)
            .then(doMatch =>{
                if(doMatch){
                    request.session.isLoggedIN = true;
                    request.session.user = usuario[0].nombre;
                    return request.session.save(err => {
                        response.redirect('/inicio');
                    });
                }else{
                    request.session.info = 'El usuarion y/o contraseña son incorrectos';
                    response.redirect('/inicio/sesion')
                }
            }).catch(err => {
                response.redirect('/inicio/sesion');
            });
        }
    })
    .catch((errror) =>{
        console.log(errror);
    } );
}
exports.fail = (request, response, next) => {
    response.render('fail');
}
exports.exito = (request, response,next) => {
    response.render('exito')
}
exports.Validar = (request, response, next) => {
    response.render(path.join('..','views','includes','inicio_sesion','sesion.ejs'),{
        info: '',
    });
    
    //response.setHeader('Set-Cookie', 'Cookie de chocolate','1');  //Enviar una cookie
};