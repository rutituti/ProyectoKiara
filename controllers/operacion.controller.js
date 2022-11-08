const { info } = require('console');
const path = require('path');

const Proceso_CV = require('../models/proceso_CV');
const ExpedienteRenta = require('../models/expedienteRenta');


exports.get_config = (request, response, next) => {
    response.sendFile(path.join(__dirname,'..','views','html','temp.html'));
};

exports.get_alquilar = (request, response, next) => {
    response.send('Cronograma RENTA Arrendatario');
};

exports.get_arrendar = (request, response, next) => {
    response.send('Cronograma RENTA Propietario');
};

exports.get_seg = (request, response, next) => {
    
    request.session.ubicacion = request.params.operacion;
    if (request.session.ubicacion === 'compra' || request.session.ubicacion === 'venta')
    {
        Proceso_CV.fetchProcesoCV(request.session.user,request.params.id_p)
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
    }else if(request.session.ubicacion === 'alquilar' ||request.session.ubicacion === 'renta' )
    {
        Proceso_CV.fetchProcesoRA(request.session.user,request.params.id_p)
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
    }
};


exports.get_segexp = (request, response, next) => {
    
    ExpedienteRenta.fetchDocsVendedor()
    .then(([rows, fieldData]) => {
        console.log(rows);
 
    })
    .catch( error => { 
        console.log(error)
    });
    
};
exports.get_operacion = (request, response, next) => {
    request.session.ubicacion = request.params.operacion;
    if (request.session.ubicacion === 'renta' || request.session.ubicacion === 'venta')
    {
        Proceso_CV.fetch_casasVR_idC(request.session.user,request.params.operacion)
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

    }else if(request.session.ubicacion === 'alquilar' )
    {
        Proceso_CV.fetch_casasA_idC(request.session.user)
        .then(([rows, fieldData]) => {
            
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

    }else if(request.session.ubicacion === 'compra')
    {
        Proceso_CV.fetch_casasC_idC(request.session.user)
        .then(([rows, fieldData]) => {
            
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
    }
  
};
