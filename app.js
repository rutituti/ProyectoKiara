// Segunda aplicacion con express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');// uso de cookies
const session = require('express-session'); // Trabajar con sessiones

const multer = require('multer'); // archivos 


// haciendo uso de EJS motor de templetes
app.set('view engine','ejs');
app.set('views','views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
//En el registro, pasamos la constante de configuración y
//usamos single porque es un sólo archivo el que vamos a subir, 
//pero hay diferentes opciones si se quieren subir varios archivos. 
//'archivo' es el nombre del input tipo file de la forma

app.use(bodyParser.json());
//fileStorage: Es nuestra constante de configuración para manejar el almacenamiento
const fileStorage = multer.diskStorage({
    destination: (request, file, callback) => {
        //'uploads': Es el directorio del servidor donde se subirán los archivos 
        callback(null, 'public/uploads');
    },
    filename: (request, file, callback) => {
        //aquí configuramos el nombre que queremos que tenga el archivo en el servidor, 
        //para que no haya problema si se suben 2 archivos con el mismo nombre concatenamos el timestamp
        callback(null, new Date().getSeconds() +'' +new Date().getMinutes() +'' + file.originalname);
    },
});
app.use(multer({ storage: fileStorage }).single('doc')); 

app.use(cookieParser());

app.use(session({
    secret: 'sxskccbdfberberbtbrtberevsdccsxaxsa',
    resave: false,
    saveUninitialized: false,
}));
/*
app.use((request, response, next) => {
    response.locals.sesion = request.session.info ? request.session.info : '';
    response.locals.user = request.session.user ? request.session.user : '';    
    response.locals.isLoggedIN = request.session.isLoggedIN ? request.session.isLoggedIN : '';
    next();
});
*/
const rutas_inicio = require('./routes/inicio.routes');
app.use('/inicio',rutas_inicio); // Modulo de pagina de Inicio

const operacionRutas = require('./routes/operacion.routes');
app.use('/operacion',operacionRutas); // Modulo de Seguimiento en Linea

const rutaUsuarios = require('./routes/usuario.routes');
app.use('/user', rutaUsuarios);

const rutaPropiedades = require('./routes/propiedades.routes');
app.use('/propiedades', rutaPropiedades);

// Agregar las cookies

// Como funciona esta funcion porque si no esta definido avanza a la siguiente, el otro cosa el con un if-else
// Si estoy en lo correcto esto es un middleware
app.use((request, response, next) => {
    response.status(404);
    response.render('error');
});
app.listen(3000);