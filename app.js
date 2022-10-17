// Segunda aplicacion con express
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// uso de cookies
const cookieParser = require('cookie-parser');

const app = express();
const session = require('express-session'); // Trabajar con sessiones
// haciendo uso de EJS motor de templetes
app.set('view engine','ejs');
app.set('views','views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));

const misRutas = require('./routes/inicio.routes');
const operacionRutas = require('./routes/seguimiento.routes');


app.use('/inicio',misRutas); // Modulo de pagina de Inicio
app.use('/seguimiento',operacionRutas); // Modulo de Seguimiento en Linea
// Agregar las cookies
app.use(cookieParser());

app.use(session({
    secret: 'sxskccbdfberberbtbrtberevsdccsxaxsa',
    resave: false,
    saveUninitialized: false,
}));
app.use((request, response, next) => {
    response.locals.sesion = request.session.user ? request.session.user : '';
    response.locals.data = request.session.data ? request.session.data : '';    
    response.locals.IdUser = request.session.IdUser ? request.session.IdUser : '';
    response.locals.IdRol = request.session.IdRol ? request.session.IdRol : '';
    next();
});
// Como funciona esta funcion porque si no esta definido avanza a la siguiente, el otro cosa el con un if-else
// Si estoy en lo correcto esto es un middleware
app.use((request, response, next) => {
    response.status(404);
    response.render('error');
});
app.listen(3000);