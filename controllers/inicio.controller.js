const { info } = require('console');
const path = require('path');
const Propiedad = require('../models/propiedad.model');

exports.get_Infoempresa = (request, response, next) => {
    let registro = '';
    response.render(path.join('..','views','pagina_inicio','about_new.ejs'),{
        registro: registro,
        isLoggedIn: request.session.isLoggedIN ? request.session.isLoggedIN : false,
        user: request.session.user ? request.session.user : '',
        nombre: request.session.nombre ? request.session.nombre : '',
    
    });
};

exports.get_casas_venta = (request, response, next) => {
    response.send('Listado de casas en RENTA');
    const cookie = request.get('Cookie').split(';')[0].trim().split('=')[0]; // Leer una cookie
    console.log(cookie);
};
/*exports.getperfil = (request, response, next) => {
    response.render(path.join('..','views','perfil','perfil.ejs'));
};*/
exports.get_casas_renta = (request, response, next) => {
    let registro = '';
    Propiedad.fetchRenta()
    .then(([rows, fieldData]) => {
        console.log('GET propiedades');
        console.log(rows);
        response.render(path.join('..','views','propiedad','propiedad_renta.ejs'),{
        registro: registro,
        propiedades: rows,
        isLoggedIn: request.session.isLoggedIN ? request.session.isLoggedIN : false,
        user: request.session.user ? request.session.user : '',
        nombre: request.session.nombre ? request.session.nombre : '',
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
    let registro = '';
    response.render(path.join('..','views','pagina_inicio','new.ejs'),{
        registro: registro,
        isLoggedIn: request.session.isLoggedIN ? request.session.isLoggedIN : false,
        user: request.session.user ? request.session.user : '',
        nombre: request.session.nombre ? request.session.nombre : '',
    });
};

exports.getSesion = (request, response, next) => {
    response.render(path.join(__dirname,'..','views','inicio_sesion','sesion'));
};