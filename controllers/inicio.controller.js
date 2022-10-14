const { info } = require('console');
const path = require('path');

exports.get_Infoempresa = (request, response, next) => {
    response.sendFile(path.join(__dirname,'..','views','html','temp.html'));
};

exports.get_casas_venta = (request, response, next) => {
    response.send('Listado de casas en RENTA');
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
    response.sendFile(path.join(__dirname,'..','views','html','pagina_inicio.html'));
};
exports.get_sesion = (request, response, next) => {
    response.sendFile(path.join(__dirname,'..','views','html','iniciar_Sesion.html'));
};