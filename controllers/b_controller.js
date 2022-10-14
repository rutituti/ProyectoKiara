const path = require('path');
const Usuario = require('../models/usuario.model.js');

// obtener informacion de la sesion con base de datos
exports.getClientes = (request, response, next) => {
    Usuario.fetchOne(request.params.id)
        .then(([rows_usuarios,fieldData]) => {
            response.render(path.join('..','views','includes','perfil','new.ejs'), {
                Clientes: rows_usuarios[1] ? rows_usuarios[1] : '',
                });
            }).catch(err => {
                console.log(err);
        });
};

// Insertar un nuevo elemento BD
exports.post_new = (request, response, next) => {
    const usuario = new
    Usuario(request.body.Name,request.body.primer_apellido,request.body.segundo_apellido,request.body.id_cliente,request.body.mail,request.body.telefono,request.body.ocupacion,request.body.estado_civil);

    usuario.save()
    .then(() => {
        response.redirect('/inicio')
    })
    .catch(error => console.log(error));
};
