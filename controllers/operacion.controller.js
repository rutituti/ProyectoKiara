const { info } = require('console');
const path = require('path');

const Proceso_CV = require('../models/proceso_CV');


exports.get_config = (request, response, next) => {
    response.sendFile(path.join(__dirname,'..','views','html','temp.html'));
};

exports.get_alquilar = (request, response, next) => {
    response.send('Cronograma RENTA Arrendatario');
};

exports.get_arrendar = (request, response, next) => {
    response.send('Cronograma RENTA Propietario');
};

exports.get_segV = (request, response, next) => {
    
    request.session.ubicacion = request.params.operacion;

    Proceso_CV.fetchProceso(request.session.user,request.params.id_p,'Vendedor')
    .then(([rows, fieldData]) => {
        //console.log(rows);
        response.render(path.join('..','views','op_venta','segVenta.ejs'), {
            seg_V: rows[0],
            info: info,
            isLoggedIn: request.session.isLoggedIN ? request.session.isLoggedIN : false,
            user: request.session.user ? request.session.user : '',
            ubicacion: request.session.ubicacion ? request.session.ubicacion : '',

        }); 
    })
    .catch( error => { 
        console.log(error)
    });
};

exports.get_venta = (request, response, next) => {
    request.session.ubicacion = request.params.operacion;
    Proceso_CV.fetch_casasV_idC(request.session.user,request.params.operacion)
    
    .then(([rows, fieldData]) => {
        //console.log(request.session.info);
        console.log("GET CASA EN VENTA");
        //console.log(rows);
        response.render(path.join('..','views','op_venta','casasV.ejs'), {
            casas_V: rows[0],
            info: info,
            isLoggedIn: request.session.isLoggedIN ? request.session.isLoggedIN : false,
            user: request.session.user ? request.session.user : '',
            ubicacion: request.session.ubicacion ? request.session.ubicacion : '',

        }); 
    })
    .catch( error => { 
        console.log(error)
    });
    //response.render(path.join('..','views','op_venta','casasV.ejs'));
};


/*
exports.get_root = (request, response, next) => {
    
    response.send('SEGUIMIENTO EN LINEA');
};
*/