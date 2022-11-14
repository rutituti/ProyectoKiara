const path = require('path');
const Proceso_CV = require('../models/proceso_CV.model');
const ExpedienteRenta = require('../models/expedienteRenta');

exports.get_seg = (request, response, next) => {
    
    request.session.ubicacion = request.params.operacion;
    
    if (request.session.ubicacion === 'compra' || request.session.ubicacion === 'venta')
    {
        Proceso_CV.fetchProcesoCV(request.session.user, request.params.id_p)
            .then(([rows, fieldData]) => {
                //console.log(rows);
                response.render(path.join('..', 'views', 'op_venta', 'segVenta.ejs'), {
                    seg_V: rows[0],
                    info: request.session.info ? request.session.info : '',
                    isLoggedIn: request.session.isLoggedIN ? request.session.isLoggedIN : false,
                    user: request.session.user ? request.session.user : '',
                    ubicacion: request.session.ubicacion ? request.session.ubicacion : '',
                    nombre: request.session.nombre ? request.session.nombre : '',
                    registro: request.session. registro ? request.session. registro : '',
                }); 
            
            }).catch( error => { 
                console.log(error);
            });

    } else if (request.session.ubicacion === 'alquilar' || request.session.ubicacion === 'renta')
    {
        Proceso_CV.fetchProcesoRA(request.session.user, request.params.id_p)
            .then(([rows, fieldData]) => {
                //console.log(rows);
                response.render(path.join('..', 'views', 'op_venta', 'segVenta.ejs'), {
                    seg_V: rows[0],
                    info: request.session.info ? request.session.info : '',
                    isLoggedIn: request.session.isLoggedIN ? request.session.isLoggedIN : false,
                    user: request.session.user ? request.session.user : '',
                    ubicacion: request.session.ubicacion ? request.session.ubicacion : '',
                    nombre: request.session.nombre ? request.session.nombre : '',
                    registro: request.session. registro ? request.session. registro : '',
                });
            
            }).catch( error => { 
                console.log(error);
            });
    }

};

exports.get_segexp = (request, response, next) => {
    request.session.ubicacion = request.params.operacion;

    
    if (request.session.ubicacion === 'alquilar')
    {
            ExpedienteRenta.fetchDocsVendedor(5)
               .then(([rows, fieldData]) => {


                    for(let r of rows[0])
                    {
                        idtipdoc = idtipdoc + r.IDtipoDocCliente + ',';
                        idtipexp = idtipexp + r.IDtipoExpCliente + ',';
                    }

                    aux1= idtipdoc.split(',');
                    aux2= idtipexp.split(',');

            ExpedienteRenta.fetchDocsVendedor(6)
                .then(([rows2, fieldData]) => {
                    //   console.log(rows2[0])
                            for(let r of rows2[0])
                            {
                                idtipdoc2 = idtipdoc2 + r. IDtipoDocCliente +',';
                                idtipexp2 = idtipexp2 + r.IDtipoExpCliente +',';
                            }
                                aux12= idtipdoc2.split(',');
                                aux22= idtipexp2.split(',');

                                response.render(path.join('..','views','op_venta','expediente.ejs'), {
                                    numdocs: rows[0],
                                    numdocs2: rows2[0],
                                    info: request.session.info ? request.session.info : '',
                                    isLoggedIn: request.session.isLoggedIN ? request.session.isLoggedIN : false,
                                    user: request.session.user ? request.session.user : '',
                                    ubicacion: request.session.ubicacion ? request.session.ubicacion : '',
                                    nombre: request.session.nombre ? request.session.nombre : '',
                                    registro: request.session. registro ? request.session. registro : '',
                                    temp: request.session.temp ? request.session.temp : 0,
                                    

                                }); 
                    
                })
                }).catch( error => { 
                            console.log(error);
                });

    } else if (request.session.ubicacion === 'renta')
    {
        request.session.numdocs2=0;
        
            ExpedienteRenta.fetchDocsVendedor(7)
                 .then(([rows, fieldData]) => {

                        response.render(path.join('..','views','op_venta','expediente.ejs'), {
                            numdocs : rows[0],
                            info: request.session.info ? request.session.info : '',
                            isLoggedIn: request.session.isLoggedIN ? request.session.isLoggedIN : false,
                            user: request.session.user ? request.session.user : '',
                            ubicacion: request.session.ubicacion ? request.session.ubicacion : '',
                            nombre: request.session.nombre ? request.session.nombre : '',
                            numdocs2 : request.session.numdocs2 ? request.session.numdocs2: 0,
                            registro: request.session. registro ? request.session. registro : '',
                            temp: request.session.temp ? request.session.temp : 0,

                        }); 
                
                
                }).catch( error => { 
                        console.log(error);
                });

    } else if (request.session.ubicacion === 'venta')
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
                                    info: request.session.info ? request.session.info : '',
                                    isLoggedIn: request.session.isLoggedIN ? request.session.isLoggedIN : false,
                                    user: request.session.user ? request.session.user : '',
                                    ubicacion: request.session.ubicacion ? request.session.ubicacion : '',
                                    nombre: request.session.nombre ? request.session.nombre : '',
                                    registro: request.session. registro ? request.session. registro : '',
                                    temp: request.session.temp ? request.session.temp : 0,

                                }); 
                        
            })
            }).catch( error => { 
                        console.log(error);
            });           
    }
   
    else if (request.session.ubicacion === 'compra')
    {
                ExpedienteRenta.fetchDocsVendedor(3)
                .then(([rows, fieldData]) => {

                ExpedienteRenta.fetchDocsVendedor(4)
                .then(([rows2, fieldData]) => {
                        console.log(rows2[0])
                                    response.render(path.join('..','views','op_venta','expediente.ejs'), {
                                        numdocs : rows[0],
                                        numdocs2 : rows2[0],
                                        info: request.session.info ? request.session.info : '',
                                        isLoggedIn: request.session.isLoggedIN ? request.session.isLoggedIN : false,
                                        user: request.session.user ? request.session.user : '',
                                        ubicacion: request.session.ubicacion ? request.session.ubicacion : '',
                                        nombre: request.session.nombre ? request.session.nombre : '',
                                        registro: request.session. registro ? request.session. registro : '',
                                        temp: request.session.temp ? request.session.temp : 0,
                                    

                                    }); 
                            
                })
                }).catch( error => { 
                     console.log(error);
                });
    }

};

exports.post_exp = (request, response, next) => {
    console.log(aux1);
    console.log(aux2);
    console.log(request.files);

        temp = request.session.temp;
            for(var i=0; i<aux1.length-1;i++)
            {
                var expediente = new ExpedienteRenta(request.session.user, aux1[i],aux2[i], 'En Revision', request.files[i].filename);
                expediente.save (request.session.user, aux1[i],aux2[i], 'En Revision', request.files[i].filename);   
            }
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
                    info: request.session.info ? request.session.info : '',
                    isLoggedIn: request.session.isLoggedIN ? request.session.isLoggedIN : false,
                    user: request.session.user ? request.session.user : '',
                    ubicacion: request.session.ubicacion ? request.session.ubicacion : '',
                    nombre: request.session.nombre ? request.session.nombre : '',
                    registro: request.session. registro ? request.session. registro : '',

                }); 
            }).catch( error => { 
            console.log(error);
            });

    }else if (request.session.ubicacion === 'alquilar' )
    {
        Proceso_CV.fetch_casasA_idC(request.session.user)
                .then(([rows, fieldData]) => {
                    
                    response.render(path.join('..','views','op_venta','casasV.ejs'), {
                        casas_V: rows[0],
                        info: request.session.info ? request.session.info : '',
                        isLoggedIn: request.session.isLoggedIN ? request.session.isLoggedIN : false,
                        user: request.session.user ? request.session.user : '',
                        ubicacion: request.session.ubicacion ? request.session.ubicacion : '',
                        nombre: request.session.nombre ? request.session.nombre : '',
                        registro: request.session. registro ? request.session. registro : '',

                    }); 
                }).catch( error => { 
                  console.log(error);
                });

    }else if(request.session.ubicacion === 'compra')
    {
        Proceso_CV.fetch_casasC_idC(request.session.user)
            .then(([rows, fieldData]) => {
                
                response.render(path.join('..','views','op_venta','casasV.ejs'), {
                    casas_V: rows[0],
                    info: request.session.info ? request.session.info : '',
                    isLoggedIn: request.session.isLoggedIN ? request.session.isLoggedIN : false,
                    user: request.session.user ? request.session.user : '',
                    ubicacion: request.session.ubicacion ? request.session.ubicacion : '',
                    nombre: request.session.nombre ? request.session.nombre : '',
                    registro: request.session. registro ? request.session. registro : '',


                }); 
            }).catch( error => { 
              console.log(error)
            });
            
    }
  
};
