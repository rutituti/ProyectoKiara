const path = require('path');
const user = require('../models/user.model');

exports.action = (request, response, next) => {
    response.render('view_file', { 
        atribute_1: 'Data 1', 
        atribute_2: 'Data 2'
    });
};