const { info } = require('console');
const path = require('path');

exports.get_Infoempresa = (request, response, next) => {
    response.sendFile(path.join(__dirname,'..','views','html','temp.html'));
    response.setHeader('Set-Cookie', 'Cookie de chocolate','1');  //Enviar una cookie
};

exports.get_casas_venta = (request, response, next) => {
    response.send('Listado de casas en RENTA');
    const cookie = request.get('Cookie').split(';')[0].trim().split('=')[0]; // Leer una cookie
    console.log(cookie);
};
exports.getperfil = (request, response, next) => {
    response.render(path.join('..','views','includes','perfil','new.ejs'));
};
exports.get_casas_renta = (request, response, next) => {
    response.send('Listado de casas en RENTA');
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
    });
};

exports.getSesion = (request, response, next) => {
    response.render(path.join(__dirname,'..','views','inicio_sesion','sesion'));
};