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
   // console.log(request.session.ubicacion_documento);
    request.session.ubicacion_documento = request.params.IDtipoDocCliente;
 //   console.log(request.session.ubicacion);
 

    
    if (request.session.ubicacion === 'alquilar')
    {
        let idtipdoc = []; 

        ExpedienteRenta.fetchDocsVendedor(ExpedienteRenta.EXPEDIENTE_ARRENDATARIO)
            .then(([rows, fieldData]) => {
                for(let r of rows[0])
                {
                    
                    request.session.id_tip_expC=r.IDtipoExpCliente;
                    request.session.id_tip_DdocC=r.IDtipoDocCliente;
                    
                }
                   
             //   request.session.documento = rows[0].Nombre;
                //console.log( rows[0].Nombre);
               // console.log(rows[0]);   

            
                ExpedienteRenta.fetchDocsVendedor(6)
                    .then(([rows2, fieldData]) => {
                    //   console.log(rows2[0])

      
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
                    
                    }).catch(error => { 
                        console.log(error);
                    });

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
    let cont =0;
    //   console.log(aux1);
    //   console.log(aux2);
    //  console.log(request.files);
   // console.log('rs'+request.session.arraydocs);
    //console.log('rf'+request.files);
    console.log(request.files[0].filename)
    for(let r of request.session.arraydocs)
    {
        console.log(r);
        console.log(request.files[cont].filename);

        let expediente = new ExpedienteRenta(request.session.user, r.tipoDoc, r.tipoExpCliente, 'En Revision', request.files[cont].filename);
        expediente.save().then().catch(err => console.log(err));   
        
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




exports.get_vistasdocs = (request, response, next) => {
 //   request.session.ubicacion = request.params.operacion;
    request.session.docs = request.params.nombre_doc;
    request.session.ubicacion = request.params.operacion;
    request.session.idexp = request.params.tipo_exp;
  //  console.log(request.params.nombre_doc,request.params.operacion,request.params.tipo_exp);
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
        nombredocumento: request.session.documento ? request.session.documento : '',
        info: request.session.info ? request.session.info : '',
        isLoggedIn: request.session.isLoggedIN ? request.session.isLoggedIN : false,
        user: request.session.user ? request.session.user : '',
        ubicacion: request.session.ubicacion ? request.session.ubicacion : '',
        nombre: request.session.nombre ? request.session.nombre : '',
        registro: request.session. registro ? request.session. registro : '',
        idocs: request.session.docs ? request.session.docs : '',
        idexp: request.session.idexp ? request.session.idexp : '',
        

    });

  
};

exports.post_docs = (request, response, next) => {
//    request.session.docs = request.params.nombre_doc;
  //  console.log(request.session.user,request.params.nombre_doc,request.file.filename,request.session.id_tip_expC,request.session.id_tip_DdocC);
  console.log('Hola'+request.params.nombre_doc,request.params.operacion,request.params.tipo_exp);
    const expediente = new ExpedienteRenta(request.session.user, request.params.nombre_doc, request.params.tipo_exp , 'En Revision', request.file.filename); 
    expediente.save(); 

     response.redirect('/user/perfil');
};