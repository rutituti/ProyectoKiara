const { info } = require('console');
const path = require('path');

const Proceso_V = require('../models/proceso_CV');

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
    //response.sendFile(path.join(__dirname,'..','views','html','crngrmVENTA.html'));
    
    Proceso_V.fetchProceso(5,3)
    .then(([rows, fieldData]) => {
        //console.log(rows);
        response.render(path.join('..','views','op_venta','segVenta.ejs'), {
            seg_V: rows[0],
            //user: request.session.user ? request.session.user : 1,
        }); 
    })
    .catch( error => { 
        console.log(error)
    });
};

exports.get_profile = (request, response, next) => {
    response.send('Perfil de Usuario');
};

exports.get_root = (request, response, next) => {
    response.send('SEGUIMIENTO EN LINEA');
};