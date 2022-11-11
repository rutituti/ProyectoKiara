const path = require('path');
const Cliente = require('../models/cliente.model');
const Asesor = require('../models/asesor.model');
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');
const { response } = require('express');


exports.get_new_admin = (request, response, next) => {
    let info = request.session.info ? request.session.info : '';
        request.session.info = '';
        response.render(path.join('usuarios','new_admin.ejs'), {
            info: info,
            isLoggedIn: request.session.isLoggedIN ? request.session.isLoggedIN : false,
            user: request.session.user ? request.session.user : '',
            nombre: request.session.nombre ? request.session.nombre : '',
         });
};

exports.post_new_admin = (request,response,next) => {
    const usuario = new Usuario(request.body.contra,request.body.username)
    usuario.save()
    .then(() => {
        //request.session = usuario.username;
        console.log('Registro de ADMIN exitoso');
        response.redirect('/user/login');
        
    })
    .catch((error) => {
        console.log(error);
        
    });
}

//Controlador GET nuevo asesor

exports.get_new_asesor = (request, response, next) => {
    let registro = request.session.info ? request.session.info : '';
        request.session.info = '';
        response.render(path.join('usuarios','new_asesor.ejs'), {
            registro: registro,
            isLoggedIn: request.session.isLoggedIN ? request.session.isLoggedIN : false,
            user: request.session.user ? request.session.user : '',
            nombre: request.session.nombre ? request.session.nombre : '',
            
         });
};

// Controlador POST nuevo asesor

exports.post_new_asesor = (request,response,next) => {
    const asesor = new Asesor(request.body.curp)
    const usuario = new Usuario(request.body.username,request.body.contra,request.body.Nombres, request.body.primerApellido, request.body.segundoApellido, request.body.telefono, request.body.email,)

     //Guarda informacion en la tabla USUARIOS
    usuario.save()
    .then(() => {
        cliente.save()
        .then(() => {
                            
        })
        .catch((error) => {
            console.log(error);
        });
        
    })
    .catch((error) => {
        console.log(error);
        
    });

    request.session.registro = "El asesor " + usuario.nombres + " fue registrado exitosamente";
    
    response.redirect('/user/login'); 
   
    
}

exports.get_new_cliente = (request, response, next) => {
    let registro = request.session.info ? request.session.info : '';
        request.session.info = '';
        response.render(path.join('usuarios','new_cliente.ejs'), {
            registro: registro,
            isLoggedIn: request.session.isLoggedIN ? request.session.isLoggedIN : false,
            user: request.session.user ? request.session.user : '',
            nombre: request.session.nombre ? request.session.nombre : '',
            
         });
};

exports.post_new_cliente = (request,response,next) => {
    const cliente = new Cliente(request.body.username,request.body.ocupacion, request.body.estado)
    const usuario = new Usuario(request.body.username,request.body.contra,request.body.Nombres, request.body.primerApellido, request.body.segundoApellido, request.body.telefono, request.body.email,)

     //Guarda informacion en la tabla USUARIOS
    usuario.save()
    .then(() => {
        cliente.save()
        .then(() => {
                            
        })
        .catch((error) => {
            console.log(error);
        });
        
    })
    .catch((error) => {
        console.log(error);
        
    });

    request.session.registro = "El Cliente " + usuario.nombres + " fue registrado exitosamente";
    
    response.redirect('/user/login'); 
   
    
}

//Controlador para lista de asesores

exports.get_listAsesor = (request, response, next) => {
    let info = request.session.info ? request.session.info : '';
    request.session.info = '';

    Asesor.fetchAll()
        .then(([rows, fieldData])=>{
            response.render(path.join('usuarios','listAsesores.ejs'),{
                asesores: rows,
                info: info,
                isLoggedIn: request.session.isLoggedIn ? request.session.isLoggedIn : false,
                user: request.session.user ? request.session.user : '',
            });
            
        }).catch(()=>{
            console.log(error);
        });
        
};

//Controlador lista usuarios

exports.get_listUsuario = (request, response, next) => {
    let info = request.session.info ? request.session.info : '';
    request.session.info = '';

    Usuario.fetchAll()
        .then(([rows, fieldData])=>{
            console.log(rows);
            response.render(path.join('usuarios','listUsuarios.ejs'),{
                clientes: rows,
                info: info,
                isLoggedIn: request.session.isLoggedIn ? request.session.isLoggedIn : false,
                user: request.session.user ? request.session.user : '',
                nombre: request.session.nombre ? request.session.nombre : '',
            });
            
        }).catch((error)=>{
                console.log(error);
        });
        
};

//Controlador para lista de clientes

exports.get_listCliente = (request, response, next) => {
    let info = request.session.info ? request.session.info : '';
    request.session.info = '';

    Cliente.fetchAll()
        .then(([rows, fieldData])=>{
            console.log(rows);
            response.render(path.join('usuarios','listClientes.ejs'),{
                clientes: rows,
                info: info,
                isLoggedIn: request.session.isLoggedIn ? request.session.isLoggedIn : false,
                user: request.session.user ? request.session.user : '',
                nombre: request.session.nombre ? request.session.nombre : '',
            });
            
        }).catch((error)=>{
                console.log(error);
        });
        
};


exports.get_login = (request, response, next) => {
    let registro = request.session.registro ? request.session.registro : '';
    request.session.info = '';

    let info = request.session.info ? request.session.info : '';
    request.session.info = '';
    console.log(request.session.info);

    response.render(path.join('usuarios','login.ejs'), {
        registro: registro,
        info : info,
        isLoggedIn: request.session.isLoggedIN ? request.session.isLoggedIN : false,
        user: request.session.user ? request.session.user : '',
        nombre: request.session.nombre ? request.session.nombre : '',
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
                    request.session.nombre = username[0].Nombres+' ' + username[0].Primer_apellido;
                    request.session.roles = new Array();
                   
                    Usuario.getRol(username[0].username).then(([rol, fieldData]) => {

                        for (let r of rol[0]) {
                            request.session.roles.push(r.Nombre);                        
                        }                      
                        
                    })
                    .catch( error => { 
                        console.log(error)
                    });               
                    
                    
                    //Obtener los permisos del usuario
                    Usuario.getPermisos(request.body.username)
                    .then( ([permisos, fieldData]) => {
                        
                        request.session.permisos = new Array();
                        
                        for (let permiso of permisos[0]) {                           
                            request.session.permisos.push(permiso.Descripcion);                            
                        }
                        
                        return request.session.save(err => {
                            response.redirect('/inicio');
                        });
                    }).catch(err => console.log(err));
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
exports.get_profile= (request, response, next) => {
    request.session.ubicacion = 'perfil';    
    
    if (request.session.roles.indexOf('Cliente') != -1)
    {               
        Cliente.get_personalInfo(request.session.user).then(([personal_info, fieldData]) => {
            request.session.personal_info =  personal_info[0];
            
            Usuario.getUser(request.session.user)
            .then(([rows, fieldData]) => {
        
                response.render(path.join('..','views','perfil','perfil.ejs'), {
                profile: rows,
                isLoggedIn: request.session.isLoggedIN ? request.session.isLoggedIN : false,
                user: request.session.user ? request.session.user : '',
                ubicacion: request.session.ubicacion ? request.session.ubicacion : '',
                nombre: request.session.nombre ? request.session.nombre : '',
                personal_info : request.session.personal_info[0] ? request.session.personal_info[0] : '',
                rol : request.session.roles ? request.session.roles : '',
            
                }); 
            })
                .catch( error => { 
                console.log(error)
            }); 
                                                                               
        })
        .catch( error => { 
            console.log(error)
        });               
    }else if (request.session.roles.indexOf('Asesor') != -1)
    {
        Asesor.get_personalInfo(request.session.user).then(([personal_info, fieldData]) => {
            request.session.personal_info =  personal_info[0];
            Usuario.getUser(request.session.user)
            .then(([rows, fieldData]) => {
        
                response.render(path.join('..','views','perfil','perfil.ejs'), {
                profile: rows,
                isLoggedIn: request.session.isLoggedIN ? request.session.isLoggedIN : false,
                user: request.session.user ? request.session.user : '',
                ubicacion: request.session.ubicacion ? request.session.ubicacion : '',
                nombre: request.session.nombre ? request.session.nombre : '',
                personal_info : request.session.personal_info[0] ? request.session.personal_info[0] : '',
                rol : request.session.roles ? request.session.roles : '',
            
                }); 
            })
                .catch( error => { 
                console.log(error)
            }); 
                                                                        
        })
        .catch( error => { 
            console.log(error)
        });  
    }    

    
   
        
};

//Controlador borrar asesor

exports.post_deleteAsesor = (request, response, next) => {
    Asesor.delete_Asesor(request.body.username)
        .then(()=>{
            Asesor.fetchAll().then(([rows, fieldData])=>{
                response.status(200).json({
                    mensaje: "El Colaborador" + request.body.username + "ha sido eliminado",
                    asesores: rows,
                });
            }).catch(error => {console.log(error)});
        }).catch(error => {console.log(error)});
};

//Controlador borrar cliente

exports.post_deleteCliente = (request, response, next) => {
    Cliente.delete_cliente(request.body.username)
        .then(()=>{
            Cliente.fetchAll().then(([rows, fieldData])=>{
                response.status(200).json({
                    mensaje: "El Cliente" + request.body.username + "ha sido eliminado",
                    asesores: rows,
                });
            }).catch(error => {console.log(error)});
        }).catch(error => {console.log(error)});
};

//Controlador borrar usuario

exports.post_deleteUsuario = (request, response, next) => {
    Usuario.delete_usuario(request.body.username)
        .then(()=>{
            Usuario.fetchAll().then(([rows, fieldData])=>{
                response.status(200).json({
                    mensaje: "El Usuario" + request.body.username + "ha sido eliminado",
                    usuarios: rows,
                });
            }).catch(error => {console.log(error)});
        }).catch(error => {console.log(error)});
};