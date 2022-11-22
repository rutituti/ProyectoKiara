const path = require('path');
const Propiedad = require('../models/propiedad.model');



//Método de búsqueda de propiedad para ser implementado con Ajax

exports.get_buscar =  (request, response, next) => {
    
    Propiedad.find(request.params.valor_busqueda)
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
    request.session.info = '';
    response.render(path.join('propiedad','propiedad.ejs'),{
        info: info,
        isLoggedIn: request.session.isLoggedIn ? request.session.isLoggedIn: false,
        user: request.session.user ? request.session.user: '',
        permisos: request.session.permisos ? request.session.permisos : '',
        nombre: request.session.nombre ? request.session.nombre : '',
        registro: registro,
        rol : request.session.roles ? request.session.roles : '',
    });
}

exports.post_newProperty = (request, response, next) => {
    let atributos = 
        (atributos.request.body.ID = request.body.ID ? request.body.ID : '',
        atributos.request.body.ID_tipoInmueble = request.body.ID_tipoInmueble ? request.body.ID_tipoInmueble : '',
        atributos.request.body.Calle = request.body.Calle ? request.body.Calle : " ",
        atributos.request.body.Numero = request.body.Numero ? request.body.Numero : '',
        atributos.request.body.Colonia = request.body.Colonia ? request.body.Colonia : " ",
        atributos.request.body.Codigo_postal = request.body.Codigo_postal ? request.body.Codigo_postal : '',
        atributos.request.body.Municipio = request.body.Municipio ? request.body.Municipio : " ",
        atributos.request.body.Estado = request.body.Estado ? request.body.Estado : " ",
        atributos.request.body.ID_Pais = request.body.ID_Pais ? request.body.ID_Pais : '',
        atributos.request.body.Longitud = request.body.Longitud ? request.body.Longitud : '',
        atributos.request.body.Latitud = request.body.Latitud ? request.body.Latitud : '',
        atributos.request.body.Operacion = request.body.Operacion ? request.body.Operacion : " ",
        atributos.request.body.Terreno = request.body.Terreno ? request.body.Terreno : " ",
        atributos.request.body.Privada_calle = request.body.Privada_calle ? request.body.Privada_calle : " ",
        atributos.request.body.Precio = request.body.Precio ? request.body.Precio : '',
        atributos.request.body.Uso_suelo = request.body.Uso_suelo ? request.body.Uso_suelo : " ",
        atributos.request.body.Construccion = request.body.Construccion ? request.body.Construccion : '',
        atributos.request.body.Descripcion = request.body.Descripcion ? request.body.Descripcion : " ",
        atributos.request.body.Imagen = request.body.Imagen ? request.body.Imagen : " ",
        atributos.request.body.Niveles = request.body.Niveles ? request.body.Niveles : '',
        atributos.request.body.Habitaciones = request.body.Habitaciones ? request.body.Habitaciones : ' ',
        atributos.request.body.Banios = request.body.Banios ? request.body.Banios : '',
        atributos.request.body.Sala_comedor = request.body.Sala_comedor ? request.body.Sala_comedor : '',
        atributos.request.body.Cocina = request.body.Cocina ? request.body.Cocina : '',
        atributos.request.body.Estacionamiento = request.body.Estacionamiento ? request.body.Estacionamiento : '',
        atributos.request.body.Gas = request.body.Gas ? request.body.Gas : " ",
        atributos.request.body.Servicio_agua = request.body.Servicio_agua ? request.body.Servicio_agua : '',
        atributos.request.body.Servicio_luz = request.body.Servicio_luz ? request.body.Servicio_luz : '',
        atributos.request.body.Servicio_Drenaje = request.body.Servicio_Drenaje ? request.body.Servicio_Drenaje : '',
        atributos.request.body.Tipo_desnivel = request.body.Tipo_desnivel ? request.body.Tipo_desnivel : '',
        atributos.request.body.Forma_terreno = request.body.Forma_terreno ? request.body.Forma_terreno : "",
        atributos.request.body.Medidas_frente = request.body.Medidas_frente ? request.body.Medidas_frente : '',
        atributos.request.body.Medidas_fondo = request.body.Medidas_fondo ? request.body.Medidas_fondo : '')

    const propiedad = new
        Propiedad(atributos);
    propiedad.save()
        .then(() => {
            console.log(atributos);
            response.redirect('/inicio');
        })
        .catch(error => console.log(error));
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