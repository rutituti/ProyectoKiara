const path = require('path');
const Propiedad = require('../models/propiedad.model');



//Método de búsqueda de propiedad para ser implementado con Ajax en ventas

exports.get_buscarV =  (request, response, next) => {
    
    Propiedad.findV(request.params.valor_busqueda)
        .then( ([rows, fieldData]) => {
            response.status(200).json(rows);
        }).catch( (error) => {
            console.log(error);
        });

};

//Método de búsqueda de propiedad para ser implementado con Ajax en rentas

exports.get_buscarR =  (request, response, next) => {
    
    Propiedad.findR(request.params.valor_busqueda)
        .then( ([rows, fieldData]) => {
            response.status(200).json(rows);
        }).catch( (error) => {
            console.log(error);
        });

};

exports.new_propiety = (request, response, next) => {
    response.render(path.join('propiedad','propiedad.ejs'),{
        isLoggedIn: request.session.isLoggedIN ? request.session.isLoggedIN : false,
        user: request.session.user ? request.session.user : '',
        nombre: request.session.nombre ? request.session.nombre : '',
        isLoggedIn: request.session.isLoggedIn ? request.session.isLoggedIn: false,
        permisos: request.session.permisos ? request.session.permisos : '',
        rol : request.session.roles ? request.session.roles : '',
    });
};

exports.get_newProperty = (request, response, next) => {
    let registro = '';
    let info = request.session.info ? request.session.info : '';
    request.session.ubicacion = request.params.operacion;
    request.session.info = '';
    response.render(path.join('propiedad','propiedad.ejs'),{
        info: info,
        isLoggedIn: request.session.isLoggedIn ? request.session.isLoggedIn: false,
        user: request.session.user ? request.session.user: '',
        permisos: request.session.permisos ? request.session.permisos : '',
        ubicacion: request.session.ubicacion ? request.session.ubicacion : '',
        nombre: request.session.nombre ? request.session.nombre : '',
        registro: registro,
        rol : request.session.roles ? request.session.roles : '',
    });
}
exports.vista_casa = (request, response, next) => {
    let registro = '';
    let info = request.session.info ? request.session.info : '';
    request.session.ubicacion = request.params.operacion;
    request.session.info = '';
    response.render(path.join('propiedad','vistaCasa.ejs'),{
        info: info,
        isLoggedIn: request.session.isLoggedIn ? request.session.isLoggedIn: false,
        user: request.session.user ? request.session.user: '',
        permisos: request.session.permisos ? request.session.permisos : '',
        ubicacion: request.session.ubicacion ? request.session.ubicacion : '',
        nombre: request.session.nombre ? request.session.nombre : '',
        registro: registro,
        rol : request.session.roles ? request.session.roles : '',
    });
}

exports.post_newProperty = (request, response, next) => {
    let atributos = new Object();
    atributos.ID_tipoInmueble= request.body.ID_tipoInmueble ? request.body.ID_tipoInmueble : ' ';
    atributos.Calle           = request.body.Calle ? request.body.Calle : " ";
    atributos.Numero         = request.body.Numero ? request.body.Numero : ' ';
    atributos.Colonia        = request.body.Colonia ? request.body.Colonia : " ";
    atributos.Codigo_postal  = request.body.Codigo_postal ? request.body.Codigo_postal : ' ';
    atributos.Municipio      = request.body.Municipio ? request.body.Municipio : " ";
    atributos.Estado         = request.body.Estado ? request.body.Estado : " ";
    atributos.ID_Pais        = request.body.ID_Pais ? request.body.ID_Pais : null;
    atributos.Longitud       = request.body.Longitud ? request.body.Longitud : 0;
    atributos.Latitud        = request.body.Latitud ? request.body.Latitud : 0;
    atributos.Operacion      = request.body.Operacion ? request.body.Operacion : " ";
    atributos.Terreno        = request.body.Terreno ? request.body.Terreno : ' ';
    atributos.Privada_calle  = request.body.Privada_calle ? request.body.Privada_calle : " ";
    atributos.Precio         = request.body.Precio ? request.body.Precio : ' ';
    atributos.Uso_suelo      = request.body.Uso_suelo ? request.body.Uso_suelo : " ";
    atributos.Construccion   = request.body.Construccion ? request.body.Construccion : ' ';
    atributos.Descripcion    = request.body.Descripcion ? request.body.Descripcion : " ";
    atributos.Imagen         = request.body.Imagen ? request.body.Imagen : "Hola";
    atributos.Niveles        = request.body.Niveles ? request.body.Niveles : ' ';
    atributos.Habitaciones   = request.body.Habitaciones ? request.body.Habitaciones : ' ';
    atributos.banios         = request.body.banios ? request.body.banios : ' ';
    atributos.Sala_comedor   = request.body.Sala_comedor ? request.body.Sala_comedor : ' ';
    atributos.Cocina         = request.body.Cocina ? request.body.Cocina : ' ';
    atributos.Estacionamiento = request.body.Estacionamiento ? request.body.Estacionamiento : ' ';
    atributos.Gas            = request.body.Gas ? request.body.Gas : " ";
    atributos.Servicio_agua  = request.body.Servicio_agua ? request.body.Servicio_agua : ' ';
    atributos.Servicio_luz   = request.body.Servicio_luz ? request.body.Servicio_luz : ' ';
    atributos.Servicio_Drenaje = request.body.Servicio_Drenaje ? request.body.Servicio_Drenaje : ' ';
    atributos.Tipo_desnivel  = request.body.Tipo_desnivel ? request.body.Tipo_desnivel : " ";
    atributos.Forma_terreno  = request.body.Forma_terreno ? request.body.Forma_terreno : " ";
    atributos.Medidas_frente = request.body.Medidas_frente ? request.body.Medidas_frente : ' ';
    atributos.Medidas_fondo  = request.body.Medidas_fondo ? request.body.Medidas_fondo : ' ';

    const propiedad = new Propiedad(atributos);
    propiedad.save()
        .then(() => {
            console.log(atributos);
            response.redirect('/inicio');
        })
        .catch(console.log(request.body));
}
exports.post_deletePropiedad = (request, response, next) => {
    Propiedad.delete_propiedad(request.body.ID)
        .then(()=>{
            Propiedad.fetchAll().then(([rows, fieldData])=>{
                response.status(200).json({
                    mensaje: "La propiedad" + request.body.ID + "ha sido eliminada",
                    propiedades: rows,
                });
            }).catch(error => {console.log(error)});
        }).catch(error => {console.log(error)});
};

//Controlador actualizar propiedad Venta => Renta

exports.post_updateVenRen = (request, response, next) => {
    Propiedad.update_VR(request.body.ID,request.body.Precio)
        .then(()=>{
            Propiedad.fetchAll().then(([rows, fieldData])=>{
                response.status(200).json({
                    mensaje: "La propiedad" + request.body.ID + "ha sido actualizada",
                    propiedades: rows,
                });
            }).catch(error => {console.log(error)});
        }).catch(error => {console.log(error)});
};

//Controlador actualizar propiedad Renta => Venta

exports.post_updateRenVen = (request, response, next) => {
    Propiedad.update_RV(request.body.ID,request.body.Precio)
        .then(()=>{
            Propiedad.fetchAll().then(([rows, fieldData])=>{
                response.status(200).json({
                    mensaje: "La propiedad" + request.body.ID + "ha sido actualizada",
                    propiedades: rows,
                });
            }).catch(error => {console.log(error)});
        }).catch(error => {console.log(error)});
};