const path = require('path');
const Proceso_CV = require('../models/proceso_CV.model');
const ExpedienteRenta = require('../models/expedienteRenta');
const Asesor = require('../models/asesor.model');
const ExpedientePropiedad = require('../models/expedientePropiedad');
const ExpedienteProp = require('../models/expedientePropiedad');

exports.update_seg = (request, response, next) => {
   
   // DAR FORMATO A FECHA RECUPERADA ACTUAL
    let date = new Date(Date.now());
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1));
    let day = ("0" + date.getDate());
    let hour = ("0" + date.getHours());
    let minutes = ("0" + date.getMinutes());
    let seconds = ("0" + date.getSeconds());

    let d = year + "-" + month + "-" + day + " ";
    let t = hour + ":" + minutes + ":" + seconds;

    console.log(request.body);
    // ACTUALIZAR CRONOGRAMA DE RENTA
    if(request.body.tipoC == 'Arrendador' || request.body.tipoC == 'Arrendatario'){
        console.log('Soy un '+request.body.tipoC+' para el proceso de Renta/Alquilar');
        Proceso_CV.get_fechaValidaRA(request.body.id_proc).then(([rows, fieldData]) => {
            console.log(rows[0].Fecha_Start);
            if(rows[0].Fecha_Start == 'Invalid Date'){
                Proceso_CV.edit_RA(request.body.id_proc,request.body.estado_act,d+t).then(([rows, fieldData]) => {
                
                    console.log('ACTUALIZADO EXITOSAMENTE');
                    response.status(200).json({                        
                        mensaje: "El estado de la Etapa"+ request.body.nombre_etapa + " se modifico a "+request.body.estado_act,
                        proceso: rows,
                    });
            
                })
                .catch( error => { 
                    console.log(error)
                });
            }else{
                Proceso_CV.edit_RA(request.body.id_proc,request.body.estado_act,'').then(([rows, fieldData]) => {
                        console.log('ACTUALIZADO EXITOSAMENTE');
                        response.status(200).json({
                            
                            mensaje: "El estado de la Etapa"+ request.body.nombre_etapa + " se modifico a "+request.body.estado_act,
                            proceso: rows,
                        });
                
                }).catch( error => { console.log(error)});
                    
                
            }

        })
        .catch( error => { 
            console.log(error)
        });
    }
    //ACTUALIZAR CRONOGRAMA DE VENTA
    if(request.body.tipoC == 'Comprador' || request.body.tipoC == 'Vendedor'){
        console.log('Soy un '+request.body.tipoC+' para el proceso de Compra/Venta');
        Proceso_CV.get_fechaValidaCV(request.body.id_proc).then(([rows, fieldData]) => {
            console.log(rows[0]);
            if(rows[0].Fecha_Start == 'Invalid Date'){
                Proceso_CV.edit_CV(request.body.id_proc,request.body.estado_act,d+t).then(([rows, fieldData]) => {
                        console.log('ACTUALIZADO EXITOSAMENTE');
                        response.status(200).json({
                        
                        mensaje: "El estado de la Etapa"+ request.body.nombre_etapa + " se modifico a "+request.body.estado_act,
                        proceso: rows,
                        });
                })
                .catch( error => { 
                    console.log(error)
                });
            }else{
                Proceso_CV.edit_CV(request.body.id_proc,request.body.estado_act,'').then(([rows, fieldData]) => {

                        console.log('ACTUALIZADO EXITOSAMENTE');
                        response.status(200).json({
                        
                        mensaje: "El estado de la Etapa"+ request.body.nombre_etapa + " se modifico a "+request.body.estado_act,
                        proceso: rows,
                        });
            
                   
                })
                .catch( error => { 
                    console.log(error)
                });
            }

        })
        .catch( error => { 
            console.log(error)
        });
    }
    
    
}

exports.get_mis_clientes = (request, response, next) => {
   
    
    Asesor.get_clientes(request.session.user)
        .then(([rows, fieldData]) => {
            console.log(rows[0]);
            response.render(path.join('..','views','op_venta','mis_clientes.ejs'), {
                clientes: rows[0],
                info: request.session.info ? request.session.info : '',
                isLoggedIn: request.session.isLoggedIN ? request.session.isLoggedIN : false,
                user: request.session.user ? request.session.user : '',
                ubicacion: request.session.ubicacion ? request.session.ubicacion : '',
                nombre: request.session.nombre ? request.session.nombre : '',
                registro: request.session. registro ? request.session. registro : '',
                permisos: request.session.permisos ? request.session.permisos : '',
                rol : request.session.roles ? request.session.roles : '',

            }); 
        })
        .catch( error => { 
            console.log(error)
        });
        
};


exports.get_seg = (request, response, next) => {

    let usuario = '';
    if(request.session.roles.indexOf('Cliente') != -1){//Si Cliente
        usuario = request.session.user;
    }else if(request.session.roles.indexOf('Asesor') != -1){
        usuario = request.params.cliente;
    }

    console.log('USUARIO '+usuario);

    request.session.ubicacion = request.params.operacion;
    request.session.idprop    = request.params.id_p;
 
    if (request.session.ubicacion === 'alquilar')
    {  
        ExpedienteRenta.fetchVerDocCliente(usuario,ExpedienteRenta.EXPEDIENTE_ARRENDATARIO, request.session.idprop )
          .then(([rows5, fieldData]) => {
            ExpedienteRenta.fetchVerDocCliente(usuario,ExpedienteRenta.EXPEDIENTE_OBLIGADOSOLID, request.session.idprop)
              .then(([rows6, fieldData]) => {
                
                        console.low(rows5[0]);
                        console.low(rows6[0]);
                        Proceso_CV.fetchProcesoRA(usuario, request.params.id_p)
                            .then(([rows4, fieldData]) => {
                                ExpedienteRenta.fetchDocsVendedor(ExpedienteRenta.EXPEDIENTE_ARRENDATARIO)
                                    .then(([rows, fieldData]) => {
                                        console.log(rows[0]);
                                        ExpedienteRenta.fetchDocsVendedor(ExpedienteRenta.EXPEDIENTE_OBLIGADOSOLID)
                                            .then(([rows2, fieldData]) => {
                                                ExpedientePropiedad.fetchDocsProp(ExpedientePropiedad.EXPEDIENTE_RENTA)
                                                    .then(([rows3, fieldData]) => {
                                                        //console.log(rows[3]);
                                                        response.render(path.join('..','views','op_venta','segVenta.ejs'), {
                                                            numdocs: rows[0],
                                                            numdocs2: rows2[0],
                                                            numdocs3: rows3[0],
                                                            desc_documentos_arre: rows5[0],
                                                            desc_documentos_arre2: rows6[0],
                                                            seg_V: rows4[0],
                                                            info: request.session.info ? request.session.info : '',
                                                            isLoggedIn: request.session.isLoggedIN ? request.session.isLoggedIN : false,
                                                            user: request.session.user ? request.session.user : '',
                                                            ubicacion: request.session.ubicacion ? request.session.ubicacion : '',
                                                            nombre: request.session.nombre ? request.session.nombre : '',
                                                            registro: request.session. registro ? request.session. registro : '',
                                                            propiedad:   request.session.idprop  ? request.session.idprop : '',
                                                        }); 
                                                
                                                }).catch(error => { 
                                                    console.log(error);
                                                });
                                            }).catch(error => { 
                                                console.log(error);
                                            });
                                    }).catch( error => { 
                                        console.log(error);
                                    });
                                }).catch( error => { 
                                    console.log(error);
                                });
                }).catch( error => { 
                    console.log(error);
                });
        }).catch( error => { 
            console.log(error);
        });

    } else if (request.session.ubicacion === 'renta')
    {
        request.session.numdocs2=0;
        request.session.numdocs3=0;
        console.log(request.session.ubicacion);
        console.log(request.session.idprop);
        Proceso_CV.fetchProcesoRA(usuario, request.params.id_p)
          .then(([rows4, fieldData]) => {
            ExpedienteRenta.fetchVerDocCliente(usuario,ExpedienteRenta.EXPEDIENTE_ARRENDADOR, request.params.id_p )
            .then(([rows5, fieldData]) => {
                   
                    ExpedienteRenta.fetchDocsVendedor(ExpedienteRenta.EXPEDIENTE_ARRENDADOR,request.params.id_p)
                        .then(([rows, fieldData]) => {
                         
                            console.log(rows5[0]);
                                response.render(path.join('..','views','op_venta','segVenta.ejs'), {
                                    numdocs : rows[0],
                                    seg_V: rows4[0],
                                    desc_documentos_arre: rows5[0],
                                    info: request.session.info ? request.session.info : '',
                                    isLoggedIn: request.session.isLoggedIN ? request.session.isLoggedIN : false,
                                    user: request.session.user ? request.session.user : '',
                                    ubicacion: request.session.ubicacion ? request.session.ubicacion : '',
                                    nombre: request.session.nombre ? request.session.nombre : '',
                                    numdocs2 : request.session.numdocs2 ? request.session.numdocs2: 0,
                                    numdocs3 : request.session.numdocs3 ? request.session.numdocs3: 0,
                                    registro: request.session. registro ? request.session. registro : '',
                                    propiedad:   request.session.idprop  ? request.session.idprop : '',
                                    permisos: request.session.permisos ? request.session.permisos : '',
                                    rol : request.session.roles ? request.session.roles : '',
                                    cliente: usuario ? usuario : '',
                                }); 
                                    
                        }).catch( error => { 
                                console.log(error);
                        });
            }).catch( error => { 
                console.log(error);
            });
        }).catch( error => { 
            console.log(error);
        });


    } else if (request.session.ubicacion === 'venta')
    {
        console.log(request.session.ubicacion);
        console.log(request.session.idprop);
     Proceso_CV.fetchProcesoCV(usuario, request.params.id_p)
      .then(([rows4, fieldData]) => {
        ExpedienteRenta.fetchDocsVendedor(usuario,ExpedienteRenta.EXPEDIENTE_VENDEDOR)
          .then(([rows5, fieldData]) => {
            ExpedienteRenta.fetchDocsVendedor(usuario,ExpedienteRenta.EXPEDIENTE_COPROPVENDEDOR)
            .then(([rows6, fieldData]) => {
                ExpedienteRenta.fetchDocsVendedor(ExpedienteRenta.EXPEDIENTE_VENDEDOR)
                    .then(([rows, fieldData]) => {
                        console.log('HolaS');
                        console.log(rows[0]);
                        ExpedienteRenta.fetchDocsVendedor(ExpedienteRenta.EXPEDIENTE_COPROPVENDEDOR)
                            .then(([rows2, fieldData]) => {
                                
                                ExpedientePropiedad.fetchDocsProp(ExpedientePropiedad.EXPEDIENTE_VENTA)
                                    .then(([rows3, fieldData]) => {
                                        //console.log(rows[3]);
                                    console.log(rows3[0]);
                                            response.render(path.join('..','views','op_venta','segVenta.ejs'), {
                                                numdocs : rows[0],
                                                numdocs2 : rows2[0],
                                                numdocs3 : rows3[0],
                                                seg_V: rows4[0],
                                                desc_documentos_arre: rows5[0],
                                                desc_documentos_arre2: rows6[0],
                                                info: request.session.info ? request.session.info : '',
                                                isLoggedIn: request.session.isLoggedIN ? request.session.isLoggedIN : false,
                                                user: request.session.user ? request.session.user : '',
                                                ubicacion: request.session.ubicacion ? request.session.ubicacion : '',
                                                nombre: request.session.nombre ? request.session.nombre : '',
                                                registro: request.session. registro ? request.session. registro : '',
                                                propiedad:   request.session.idprop  ? request.session.idprop : '',
                                                permisos: request.session.permisos ? request.session.permisos : '',
                                                rol : request.session.roles ? request.session.roles : '',
                                                cliente: usuario ? usuario : '',
                                            }); 
                                        }).catch( error => { 
                                            console.log(error);
                                        });  
                        }).catch( error => { 
                            console.log(error);
                        }); 
                    }).catch( error => { 
                                console.log(error);
                    }); 
                }).catch( error => { 
                    console.log(error);
                });  
            }).catch( error => { 
                console.log(error);
            });   
        }).catch( error => { 
            console.log(error);
        }); 
    }
   
    else if (request.session.ubicacion === 'compra')
    {
        request.session.numdocs2=0;
        request.session.numdocs3=0;
        console.log(request.session.ubicacion);
        console.log(request.session.idprop);

        Proceso_CV.fetchProcesoCV(usuario, request.params.id_p)
        .then(([rows4, fieldData]) => {
                ExpedienteRenta.fetchDocsVendedor(ExpedienteRenta.EXPEDIENTE_COMPRADOR)
                .then(([rows, fieldData]) => {

                    ExpedienteRenta.fetchDocsVendedor(ExpedienteRenta.EXPEDIENTE_COPROPCOMPRADOR)
                        .then(([rows2, fieldData]) => {
                            //  console.log(rows2[0])
                                            response.render(path.join('..','views','op_venta','segVenta.ejs'), {
                                                numdocs : rows[0],
                                                numdocs2 : rows2[0],
                                                numdocs3 : request.session.numdocs3 ? request.session.numdocs3: 0,
                                                info: request.session.info ? request.session.info : '',
                                                isLoggedIn: request.session.isLoggedIN ? request.session.isLoggedIN : false,
                                                user: request.session.user ? request.session.user : '',
                                                ubicacion: request.session.ubicacion ? request.session.ubicacion : '',
                                                nombre: request.session.nombre ? request.session.nombre : '',
                                                registro: request.session. registro ? request.session. registro : '',
                                                temp: request.session.temp ? request.session.temp : 0,
                                                propiedad: request.session.idpropiedad ? request.session.idpropiedad : '',
                                                permisos: request.session.permisos ? request.session.permisos : '',
                                                rol : request.session.roles ? request.session.roles : '',
                                                cliente: usuario ? usuario : '',
                                            }); 
                                    
                        }).catch( error => { 
                            console.log(error);
                       });
                }).catch( error => { 
                     console.log(error);
                });
            }).catch( error => { 
                console.log(error);
           });
    }


};



exports.get_operacion = (request, response, next) => {
    request.session.ubicacion = request.params.operacion;
    let usuario = '';
    if(request.session.roles.indexOf('Cliente') != -1){//Si Cliente
        usuario = request.session.user;
    }else if(request.session.roles.indexOf('Asesor') != -1){
        usuario = request.params.cliente;
    }

    if (request.session.ubicacion === 'renta' || request.session.ubicacion === 'venta')
    {
        Proceso_CV.fetch_casasVR_idC(usuario,request.params.operacion)
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
                cliente: usuario ? usuario : '',
                permisos: request.session.permisos ? request.session.permisos : '',
                rol : request.session.roles ? request.session.roles : '',

                }); 
            }).catch( error => { 
            console.log(error);
            });

    }else if (request.session.ubicacion === 'alquilar' )
    {
        Proceso_CV.fetch_casasA_idC(usuario)
        .then(([rows, fieldData]) => {
            
            response.render(path.join('..','views','op_venta','casasV.ejs'), {
                casas_V: rows[0],
                info: request.session.info ? request.session.info : '',
                isLoggedIn: request.session.isLoggedIN ? request.session.isLoggedIN : false,
                user: request.session.user ? request.session.user : '',
                ubicacion: request.session.ubicacion ? request.session.ubicacion : '',
                nombre: request.session.nombre ? request.session.nombre : '',
                registro: request.session. registro ? request.session. registro : '',
                cliente: usuario ? usuario : '',
                permisos: request.session.permisos ? request.session.permisos : '',
                rol : request.session.roles ? request.session.roles : '',

                    }); 
                }).catch( error => { 
                  console.log(error);
                });

    }else if(request.session.ubicacion === 'compra')
    {
        Proceso_CV.fetch_casasC_idC(usuario)
        .then(([rows, fieldData]) => {
            
            response.render(path.join('..','views','op_venta','casasV.ejs'), {
                casas_V: rows[0],
                info: request.session.info ? request.session.info : '',
                isLoggedIn: request.session.isLoggedIN ? request.session.isLoggedIN : false,
                user: request.session.user ? request.session.user : '',
                ubicacion: request.session.ubicacion ? request.session.ubicacion : '',
                nombre: request.session.nombre ? request.session.nombre : '',
                registro: request.session. registro ? request.session. registro : '',
                cliente: usuario ? usuario : '',
                permisos: request.session.permisos ? request.session.permisos : '',
                rol : request.session.roles ? request.session.roles : '',



                }); 
            }).catch( error => { 
              console.log(error)
            });

    }
  
};

exports.get_vistasdocs = (request, response, next) => {
    //   request.session.ubicacion = request.params.operacion;
       request.session.docs      = request.params.nombre_doc;
       request.session.ubicacion = request.params.operacion;
       request.session.idexp     = request.params.tipo_exp;
       request.session.idprop    = request.params.id_p;
    //  console.log( request.session.docs, request.session.idexp, request.session.ubicacion);
        if (request.session.docs == '1')
        {
           request.session.documento='CURP';
        }else if (request.session.docs == '2')
        {
           request.session.documento='Identificacion Oficial'; 
        }else if (request.session.docs == '3')
        {
           request.session.documento='Comprobante de domicilio'; 
        }else if (request.session.docs == '4')
        {
           request.session.documento='Acta de nacimiento'; 
        }else if (request.session.docs == '5')
        {
           request.session.documento='Acta de Matrimonio'; 
        }else if (request.session.docs == '6')
        {
           request.session.documento='Constancia de Situacion Fiscal'; 
        }else if (request.session.docs == '7')
        {
           request.session.documento='Estado de Cuenta Bancario'; 
        }else if (request.session.docs == '8')
        {
           request.session.documento='Solicitud de arrendamiento'; 
        }else if (request.session.docs == '9')
        {
           request.session.documento='Recibo de nomina'; 
        }else if (request.session.docs == '10')
        {
           request.session.documento='Pago de anticipo de poliza Juridica'; 
        }else if (request.session.docs == '11')
        {
           request.session.documento='Comprobante de Ingresos'; 
        }  
          
       response.render(path.join('..','views','op_venta','vistassubirdocs.ejs'), {
           nombredocumento: request.session.documento    ? request.session.documento  : '',
           info:            request.session.info         ? request.session.info       : '',
           isLoggedIn:      request.session.isLoggedIN   ? request.session.isLoggedIN : false,
           user:            request.session.user         ? request.session.user       : '',
           ubicacion:       request.session.ubicacion    ? request.session.ubicacion  : '',
           nombre:          request.session.nombre       ? request.session.nombre     : '',
           registro:        request.session. registro    ? request.session. registro  : '',
           idocs:           request.session.docs         ? request.session.docs       : '',
           idexp:           request.session.idexp        ? request.session.idexp      : '',
           propiedad:          request.session.idprop       ? request.session.idprop     : '',
           idocs: request.session.docs ? request.session.docs : '',
           idexp: request.session.idexp ? request.session.idexp : '',
           permisos: request.session.permisos ? request.session.permisos : '',
           rol : request.session.roles ? request.session.roles : '',
       });
   };

exports.get_vistasdocsProp = (request, response, next) => {
    //   request.session.ubicacion = request.params.operacion;
    request.session.docs      = request.params.nombre_docProp;
    request.session.ubicacion = request.params.operacion;
    request.session.idexp     = request.params.tipo_expProp;
    request.session.idprop    = request.params.id_p;
     // console.log(request.params.nombre_doc,request.params.operacion,request.params.tipo_exp);
        if (request.session.docs == '1')
        {
           request.session.documento='Constancia de inscripcion al registro publico de escrituras';
        }else if (request.session.docs == '2')
        {
           request.session.documento='Escrituras'; 
        }else if (request.session.docs  == '3')
        {
           request.session.documento='Predial'; 
        }else if (request.session.docs == '4')
        {
           request.session.documento='Recibo de Luz'; 
        }else if (request.session.docs == '5')
        {
           request.session.documento='Recibo de Agua'; 
        }else if (request.session.docs == '6')
        {
           request.session.documento='Recibo de gas'; 
        }else if (request.session.docs == '7')
        {
           request.session.documento='CFDI'; 
        }else if (request.session.docs == '8')
        {
           request.session.documento='Terminacion de obra'; 
        }else if (request.session.docs == '9')
        {
           request.session.documento='Constancia de numero oficial'; 
        }else if (request.session.docs== '10')
        {
           request.session.documento='Planos arquitectonicos'; 
        }else if (request.session.docs == '11')
        {
           request.session.documento='Carta de no adeudo de mantenimiento y cuotas especiales'; 
        }else if (request.session.docs == '12')
        {
           request.session.documento='Documento cancelacion de hipoteca'; 
        }
        
       response.render(path.join('..','views','op_venta','vistassubirdocsprop.ejs'), {
           nombredocumento: request.session.documento ? request.session.documento : '',
           info: request.session.info ? request.session.info : '',
           isLoggedIn: request.session.isLoggedIN ? request.session.isLoggedIN : false,
           user: request.session.user ? request.session.user : '',
           ubicacion: request.session.ubicacion ? request.session.ubicacion : '',
           nombre: request.session.nombre ? request.session.nombre : '',
           registro: request.session. registro ? request.session. registro : '',
           idocs: request.session.docs ? request.session.docs : '',
           idexp: request.session.idexp ? request.session.idexp : '',
          propiedad:          request.session.idprop       ? request.session.idprop     : '',
           permisos: request.session.permisos ? request.session.permisos : '',
           rol : request.session.roles ? request.session.roles : '',
       });
   };

   exports.post_docs = (request, response, next) => {
    request.session.docs      = request.params.nombre_doc;
    request.session.ubicacion = request.params.operacion;
    request.session.idexp     = request.params.tipo_exp;
    request.session.idprop    = request.params.id_p;
    
    console.log(request.file.path);
      console.log( request.session.user, request.session.docs, request.session.idexp, 'En revision', request.file.filename);
      const expediente = new ExpedienteRenta( request.session.user, request.params.id_p, request.session.docs, request.session.idexp, 'En revision',request.file.filename);
    expediente.save(); 
     

     response.redirect('/user/perfil'); 
};

exports.post_docsProp = (request, response, next) => {
    request.session.docs      = request.params.nombre_docProp;
    request.session.ubicacion = request.params.operacion;
    request.session.idexp     = request.params.tipo_expProp;
    request.session.idprop    = request.params.id_p;
 
    // console.log(request.session.user, request.session.docs, request.session.idexp, 'En Revision', request.file.filename);
//    request.session.docs = request.params.nombre_doc;
   //  console.log(request.session.user,request.params.nombre_doc,request.file.filename,request.session.id_tip_expC,request.session.id_tip_DdocC);
     const expediente2 = new ExpedientePropiedad(request.session.idprop , request.session.docs, request.session.idexp, 'En Revision', request.file.filename);
     expediente2.save();  
 
      response.redirect('/user/perfil'); 
 };