const path = require('path');
const Cliente = require('../models/cliente.model');
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');


exports.get_new_admin = (request, response, next) => {
    let info = request.session.info ? request.session.info : '';
        request.session.info = '';
        response.render(path.join('usuarios','new_admin.ejs'), {
            info: info,
         });
};

exports.post_new_admin = (request,response,next) => {
    const usuario = new Usuario(request.body.contra,request.body.username)
    
    usuario.save()
    .then(() => {
        request.session = usuario.username;
        console.log('Registro de CLiente exitoso');
        
    })
    .catch((error) => {
        console.log(error);
        response.redirect('/inicio/fail')
    });
}


exports.get_new_cliente = (request, response, next) => {
    let info = request.session.info ? request.session.info : '';
        request.session.info = '';
        response.render(path.join('usuarios','new_cliente.ejs'), {
            info: info,
         });
};

exports.post_new_cliente = (request,response,next) => {
    const cliente = new Cliente(request.body.Nombres,request.body.primerApellido,request.body.segundoApellido,request.body.telefono,request.body.email,request.body.ocupacion,request.body.estado)
    const usuario = new Usuario(request.body.contra,request.body.username)
    
    cliente.save()
    .then(() => {
        console.log('Registro de CLiente exitoso');
        response.redirect('/inicio');
        
        
    })
    .catch((error) => {
        console.log(error);
        
    });
    usuario.save()
    .then(() => {
        request.session = usuario.username;
        console.log('Registro de CLiente exitoso');
        
    })
    .catch((error) => {
        console.log(error);
        response.redirect('/inicio/fail')
    });
}

exports.post_new_cliente = (request,response,next) => {
    const usuario = new Usuario(request.body.Nombres,request.body.primerApellido,request.body.segundoApellido,request.body.telefono,request.body.email,request.body.ocupacion,request.body.estado,request.body.contra,request.body.username)
    
    
    usuario.saveCliente()
    .then(() => {
        console.log('Registro de CLiente exitoso');
        response.redirect('/inicio');
        
        
    })
    .catch((error) => {
        console.log(error);
        
    });
    usuario.saveUsuario()
    .then(() => {
        request.session = usuario.username;
        console.log('Registro de CLiente exitoso');
        
    })
    .catch((error) => {
        console.log(error);
        response.redirect('/inicio/fail')
    });
}

exports.get_login = (request, response, next) => {
    let info = request.session.info ? request.session.info : '';
    console.log(info);
    request.session.info = '';
    response.render(path.join('usuarios','login.ejs'), {
        info: info,
    });
};


exports.post_login = (request, response, next) => {
    const usuario = new Usuario(request.body.Nombres,request.body.primerApellido,request.body.segundoApellido,request.body.telefono,request.body.email,request.body.ocupacion,request.body.estado,request.body.contra,request.body.username)
    console.log(request.body.username)
    Usuario.getUser(request.body.username)
    
    .then(([username, fieldData]) => {
        if(username.length < 1){
            
            request.session.info = 'El usuario y/o contraseña son incorrectos';
            response.redirect('/user/login');
        }else{
            console.log("bcrypt");
            bcrypt.compare(request.body.contra, username[0].contra)
            .then(doMatch =>{
                if(doMatch){
                    request.session.isLoggedIN = true;
                    request.session.user = username[0].nombre;
                    return request.session.save(err => {
                        response.redirect('/inicio');
                    });
                }else{
                    request.session.info = 'El usuarion y/o contraseña son incorrectos';
                    response.redirect('/user/login')
                }
            }).catch(err => {
                response.redirect('/user/login');
            });
        }
    })
    .catch((errror) =>{
        console.log(errror);
    } );
}

exports.logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/inicio'); //Este código se ejecuta cuando la sesión se elimina.
    });
};
    

//MENSAJE DE DEBUG
/*
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
*/