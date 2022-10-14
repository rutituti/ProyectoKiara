const path = require('path');
const Cliente = require('../models/user.model.js');

// Obtener informacion de la sesion con base de datos
exports.getCliente = (request, response, next) => {
    response.render(path.join('..','views','includes','usuarios','new.ejs'),{
        info : '',
    });
};

// Insertar un elemento a la base de datos
exports.post_new = (request, response, next) => {
    const cliente = new
    Cliente(request.body.Name,request.body.primer_apellido,request.body.segundo_apellido,request.body.id_cliente,request.body.mail,request.body.telefono,request.body.ocupacion,estado_civil);

    cliente.save()
    .then(() => {
        response.redirect('/inicio');
    })
    .catch(error => console.log(error));
};
