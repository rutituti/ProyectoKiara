const path = require('path');
const Cliente = require('../models/cliente.model');
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');


exports.get_new_admin = (request, response, next) => {
    let info = request.session.info ? request.session.info : '';
        request.session.info = '';
        response.render(path.join('usuarios','new_admin.ejs'), {
            info: info,
            isLoggedIn: request.session.isLoggedIN ? request.session.isLoggedIN : false,
            user: request.session.user ? request.session.user : '',
         });
};

exports.post_new_admin = (request,response,next) => {
    const usuario = new Usuario(request.body.contra,request.body.username)
    usuario.save()
    .then(() => {
        //request.session = usuario.username;
        console.log('Registro de CLiente exitoso');
        response.redirect('/user/new/admin');
        
    })
    .catch((error) => {
        console.log(error);
        
    });
}


exports.get_new_cliente = (request, response, next) => {
    let info = request.session.info ? request.session.info : '';
        request.session.info = '';
        response.render(path.join('usuarios','new_cliente.ejs'), {
            info: info,
            isLoggedIn: request.session.isLoggedIN ? request.session.isLoggedIN : false,
            user: request.session.user ? request.session.user : '',
            
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
        
    });
}



exports.get_login = (request, response, next) => {
    let info = request.session.info ? request.session.info : '';
    console.log(request.session.isLoggedIn);
    request.session.info = '';
    response.render(path.join('usuarios','login.ejs'), {
        info: info,
        isLoggedIn: request.session.isLoggedIN ? request.session.isLoggedIN : false,
        user: request.session.user ? request.session.user : '',
    });
};



exports.post_login = (request, response, next) => {
   
    Usuario.getUser(request.body.username)
    
    .then(([username, fieldData]) => {
        
        if(username.length < 1){
            
            request.session.info = 'El usuario y/o contraseña son incorrectos';
            response.redirect('/user/login');
        }else{
            
            bcrypt.compare(request.body.contra, username[0].password)
            .then(doMatch =>{
                if(doMatch){
                    request.session.isLoggedIN = true;
                   
                    request.session.user = username[0].username;
                    console.log(request.session.user);
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
   
// Obtener perfil de usuario
exports.get_profile = (request, response, next) => {
    request.session.ubicacion = 'perfil';
    console.log(request.session);
    Cliente.fetch_profile_id(request.session.user)
    .then(([rows, fieldData]) => {
        console.log("GET Perfil usuario");
        console.log(rows);
        response.render(path.join('..','views','perfil','perfil.ejs'), {
            profile_C: rows[0],
            isLoggedIn: request.session.isLoggedIN ? request.session.isLoggedIN : false,
            user: request.session.user ? request.session.user : '',
            ubicacion: request.session.ubicacion ? request.session.ubicacion : '',

        }); 
    })
    .catch( error => { 
        console.log(error)
    });
};

