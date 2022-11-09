const { info } = require('console');
const path = require('path');
const Propiedad = require('../models/propiedad.model');

exports.get_Infoempresa = (request, response, next) => {
    response.render(path.join('..','views','pagina_inicio','about_new.ejs'),{
        info: info,
        isLoggedIn: request.session.isLoggedIN ? request.session.isLoggedIN : false,
        user: request.session.user ? request.session.user : '',
        nombre: request.session.nombre ? request.session.nombre : '',
    //response.setHeader('Set-Cookie', 'Cookie de chocolate','1');  //Enviar una cookie
    });
};

exports.get_casas_venta = (request, response, next) => {
    Propiedad.fetchVenta()
    .then(([rows, fieldData]) => {
        console.log('GET propiedades Venta');
        console.log(rows);
        response.render(path.join('..','views','propiedad','propiedad_renta.ejs'),{
        propiedades: rows,
        isLoggedIn: request.session.isLoggedIN ? request.session.isLoggedIN : false,
        nombre: request.session.nombre ? request.session.nombre : '',
        user: request.session.user ? request.session.user : '',
        });
    })
    .catch(error => {
        console.log(error);
    });  
};
/*exports.getperfil = (request, response, next) => {
    response.render(path.join('..','views','perfil','perfil.ejs'));
};*/
exports.get_casas_renta = (request, response, next) => {
    Propiedad.fetchRenta()
    .then(([rows, fieldData]) => {
        console.log('GET propiedades');
        console.log(rows);
        response.render(path.join('..','views','propiedad','propiedad_renta.ejs'),{
        propiedades: rows,
        isLoggedIn: request.session.isLoggedIN ? request.session.isLoggedIN : false,
        nombre: request.session.nombre ? request.session.nombre : '',
        user: request.session.user ? request.session.user : '',
        });
    })
    .catch(error => {
        console.log(error);
    });  
};

exports.get_new = (request, response, next) => {
    response.render(path.join('..','views','includes','usuarios','new.ejs'));
};

exports.get_casas = (request, response, next) => {
    response.send('Listado de casas');
};

exports.get_root = (request, response, next) => {
    
    response.render(path.join('..','views','pagina_inicio','new.ejs'),{
        info: info,
        isLoggedIn: request.session.isLoggedIN ? request.session.isLoggedIN : false,
        user: request.session.user ? request.session.user : '',
        nombre: request.session.nombre ? request.session.nombre : '',
    });
};

exports.getSesion = (request, response, next) => {
    response.render(path.join(__dirname,'..','views','inicio_sesion','sesion'));
};