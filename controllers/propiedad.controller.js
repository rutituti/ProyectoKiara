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

