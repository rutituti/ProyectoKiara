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
    });
};

exports.get_newProperty = (request, response, next) => {
    let info = request.session.info ? request.session.info : '';
    request.session.info = '';
    response.render(path.join('propiedades','propiedad.ejs'),{
        info: info,
        isLoggedIN: request.session.isLoggedIN ? request.session.isLoggedIN: false,
        user: request.session.user ? request.session.user: '',
    });
}
/*
exports.post_newProperty = (request, response, next) => {
    const propiedad = new
        Propiedad(request.body.ID, request.body.ID_tipoInmueble, request.body.Calle, request.body.Numero, request.body.Colonia, request.body.Codigo_postal, request.body.Municipio, request.body.Estado, request.body.ID_Pais, request.body.Longitud, request.body.Latitud, request.body.Operacion, request.body.Terreno, request.body.Privada_calle, request.body.Precio, request.body.Uso_suelo, request.body.Construccion, request.body.Descripcion, request.body.Imagen, request.body.Niveles, request.body.Habitaciones, request.body.Baños, request.body.Sala_comedor, request.body.Cocina, request.body.Estacionamiento, request.body.Gas, request.body.Servicio_agua, request.body.Servicio_luz, request.body.Servicio_Drenaje, request.body.Tipo_desnivel, request.body.Forma_terreno, request.body.Medidas_frente, request.body.Medidas_fondo);
    propiedad.save()
        .then(() => {
            response.redirect('/inicio/propiedades/new');
        })
        .catch(error => console.log(error));
}*/
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