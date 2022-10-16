const path = require('path');
const Usuario = require('../models/user.model.js');
const user = require('../models/user.model.js');
const db = require

// obtener informacion de la sesion con base de datos
exports.get_new = (request, response, next) => {
    let info = request.session.info ? request.session.info : '';
    //let user_id = request.session.user_id ? request.session.user_id : 1;
    request.session.info = '';
    response.render(path.join('usuarios','new.ejs'),{
        info : info,
    });
};

//nombre,apellidos,user,mail,direccion,pais,estado,c
exports.post_new = (request, response, next) => {
    const usario = new
    Usuario(request.body.nombre, request.body.apellidos, request.body.user,request.body.mail, request.body.direccion, request.body.pais,request.body.estado,request.body.cp);

    usuario.save()
    .then(() => {
        response.redirect('/user/login');
    })
    .catch(error => console.log(error));
};
