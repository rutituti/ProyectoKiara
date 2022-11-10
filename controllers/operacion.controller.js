const { info } = require('console');
const path = require('path');


const Proceso_CV = require('../models/proceso_CV.model');
const ExpedienteRenta = require('../models/expedienteRenta');

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
                nombre: request.session.nombre ? request.session.nombre : '',

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
                nombre: request.session.nombre ? request.session.nombre : '',

            }); 
        })
        .catch( error => { 
            console.log(error)
        });
    }
};


exports.get_segexp = (request, response, next) => {
    request.session.ubicacion = request.params.operacion;
 //   console.log(request.session.ID_tipoExpArrendatario);
//  console.log(request.session.ubicacion);
    if (request.session.ubicacion === 'alquilar')
    {

            ExpedienteRenta.fetchDocsVendedor(5)
            .then(([rows, fieldData]) => {
                ExpedienteRenta.fetchDocsVendedor(6)
                .then(([rows2, fieldData]) => {
                console.log(rows2[0])
                            response.render(path.join('..','views','op_venta','expediente.ejs'), {
                                numdocs : rows[0],
                                numdocs2 : rows2[0],
                                info: info,
                                isLoggedIn: request.session.isLoggedIN ? request.session.isLoggedIN : false,
                                user: request.session.user ? request.session.user : '',
                                ubicacion: request.session.ubicacion ? request.session.ubicacion : '',
                                nombre: request.session.nombre ? request.session.nombre : '',
                            

                            }); 
                    
                        })
                    })
                        .catch( error => { 
                            console.log(error)
                        });
    }else if(request.session.ubicacion === 'renta')
    {
        request.session.numdocs2=0;
   ExpedienteRenta.fetchDocsVendedor(7)
   .then(([rows, fieldData]) => {
   console.log(rows[0])
            response.render(path.join('..','views','op_venta','expediente.ejs'), {
                numdocs : rows[0],
                info: info,
                isLoggedIn: request.session.isLoggedIN ? request.session.isLoggedIN : false,
                user: request.session.user ? request.session.user : '',
                ubicacion: request.session.ubicacion ? request.session.ubicacion : '',
                nombre: request.session.nombre ? request.session.nombre : '',
                numdocs2 : request.session.numdocs2 ? request.session.numdocs2: 0,
            

            }); 
    
       
    })
        .catch( error => { 
            console.log(error)
        });
    } else if(request.session.ubicacion === 'venta')
    {
        //falta agregar exp propiedad
        ExpedienteRenta.fetchDocsVendedor(1)
         .then(([rows, fieldData]) => {
            ExpedienteRenta.fetchDocsVendedor(2)
            .then(([rows2, fieldData]) => {
            console.log(rows2[0])
                        response.render(path.join('..','views','op_venta','expediente.ejs'), {
                            numdocs : rows[0],
                            numdocs2 : rows2[0],
                            info: info,
                            isLoggedIn: request.session.isLoggedIN ? request.session.isLoggedIN : false,
                            user: request.session.user ? request.session.user : '',
                            ubicacion: request.session.ubicacion ? request.session.ubicacion : '',
                            nombre: request.session.nombre ? request.session.nombre : '',
                        

                        }); 
                
                    })
                })
                    .catch( error => { 
                        console.log(error)
                    });           
    }
   
    else if(request.session.ubicacion === 'compra')
    {
                ExpedienteRenta.fetchDocsVendedor(3)
                .then(([rows, fieldData]) => {
                        ExpedienteRenta.fetchDocsVendedor(4)
                        .then(([rows2, fieldData]) => {
                        console.log(rows2[0])
                                    response.render(path.join('..','views','op_venta','expediente.ejs'), {
                                        numdocs : rows[0],
                                        numdocs2 : rows2[0],
                                        info: info,
                                        isLoggedIn: request.session.isLoggedIN ? request.session.isLoggedIN : false,
                                        user: request.session.user ? request.session.user : '',
                                        ubicacion: request.session.ubicacion ? request.session.ubicacion : '',
                                        nombre: request.session.nombre ? request.session.nombre : '',
                                    

                                    }); 
                            
                                })
                            })
                                .catch( error => { 
                                    console.log(error)
                                });
    }

};

exports.post_exp = (request, response, next) => {
       response.redirect('/inicio');
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
                nombre: request.session.nombre ? request.session.nombre : '',

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
                nombre: request.session.nombre ? request.session.nombre : '',

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

                nombre: request.session.nombre ? request.session.nombre : '',


            }); 
        })
        .catch( error => { 
            console.log(error)
        });
    }
  
};
