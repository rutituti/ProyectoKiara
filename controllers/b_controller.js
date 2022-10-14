const path = require('path');
const Usuario = require('../models/consulta_cliente.model.js');

// obtener informacion de la sesion con base de datos
exports.getClientes = (request, response, next) => {
    Usuario.fetchAll()
    .then(([rows,fieldData]) => {
        console.log(rows);
    })
    .catch(err => {
        console.log(err);
    });
};

//nombre,apellidos,user,mail,direccion,pais,estado,c
exports.post_new = (request, response, next) => {
    const usuario = new
    Usuario(request.body.Name,request.body.primer_apellido,request.body.segundo_apellido,request.body.id_cliente,request.body.mail,request.body.telefono,request.body.ocupacion,request.body.estado_civil);

    usuario.save()
    .then(() => {
        response.redirect('/inicio')
    })
    .catch(error => console.log(error));
};
