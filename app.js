// Segunda aplicacion con express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');// uso de cookies
const session = require('express-session'); // Trabajar con sessiones

// haciendo uso de EJS motor de templetes
app.set('view engine','ejs');
app.set('views','views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));


app.use(cookieParser());

app.use(session({
    secret: 'sxskccbdfberberbtbrtberevsdccsxaxsa',
    resave: false,
    saveUninitialized: false,
}));


const rutas_inicio = require('./routes/inicio.routes');
app.use('/inicio',rutas_inicio); // Modulo de pagina de Inicio

const operacionRutas = require('./routes/operacion.routes');
app.use('/operacion',operacionRutas); // Modulo de Seguimiento en Linea

const rutaUsuarios = require('./routes/usuario.routes');
app.use('/user', rutaUsuarios);
// Agregar las cookies

app.use((request, response, next) => {
    response.locals.sesion = request.session.info ? request.session.info : '';
    response.locals.user = request.session.user ? request.session.user : '';    
    response.locals.isLoggedIN = request.session.isLoggedIN ? request.session.isLoggedIN : '';
    next();
});

// Como funciona esta funcion porque si no esta definido avanza a la siguiente, el otro cosa el con un if-else
// Si estoy en lo correcto esto es un middleware
app.use((request, response, next) => {
    response.status(404);
    response.render('error');
});
app.listen(3000);