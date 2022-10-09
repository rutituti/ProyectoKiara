// Segunda aplicacion con express
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// haciendo uso de EJS motor de templetes
app.set('view engine','ejs');
app.set('views','views')

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));

const misRutas = require('./routes/paginainicio.routes');
const operacionRutas = require('./routes/operacion.routes');

app.use('/Inicio',misRutas); // modulo 1
app.use('/seguimiento',operacionRutas); // Modulo 2

// Como funciona esta funcion porque si no esta definido avanza a la siguiente, el otro cosa el con un if-else
// Si estoy en lo correcto esto es un middleware
app.use((request, response, next) => {
    //response.status(404).send('<h1>Error 404 </h1>');
    //response.status(404);
    response.sendFile(path.join(__dirname,'views','error.html'));
});
app.listen(3000);