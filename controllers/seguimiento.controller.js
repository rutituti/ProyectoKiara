const { info } = require('console');
const path = require('path');

exports.get_config = (request, response, next) => {
    response.sendFile(path.join(__dirname,'..','views','html','temp.html'));
};

exports.get_alquilar = (request, response, next) => {
    response.send('Cronograma RENTA Arrendatario');
};

exports.get_arrendar = (request, response, next) => {
    response.send('Cronograma RENTA Propietario');
};

exports.get_venta = (request, response, next) => {
    response.sendFile(path.join(__dirname,'..','views','html','crngrmVENTA.html'));
    //response.send('Cronograma VENTA');
};

exports.get_profile = (request, response, next) => {
    response.send('Perfil de Usuario');
};

exports.get_root = (request, response, next) => {
    response.send('SEGUIMIENTO EN LINEA');
};