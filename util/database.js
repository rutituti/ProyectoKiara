const mysql = require('mysql2');

//Ambientes de desarrollo
let XAMPP = 1;
let AlwaysData = 2;

let select_env = AlwaysData;

// Variables de configuracion de base de datos
let host_env
let user_env
let database_env
let password_env

if(select_env === AlwaysData){
    host_env = 'mysql-kiara.alwaysdata.net';
    user_env = 'kiara'; //Nombre de usuario PhpMyAdmin -> https://phpmyadmin.alwaysdata.com/
    database_env = 'kiara_dev';
    password_env = '!Prjct_K14r4!'; //Contraseña PhpMyAdmin -> https://phpmyadmin.alwaysdata.com/
}else if(select_env === XAMPP){
    host_env = 'localhost';
    user_env = 'root';
    database_env = 'database_name';
    password_env = '';
}

const pool = mysql.createPool({
    host: host_env,
    user: user_env,
    database: database_env,
    password: password_env,
});

module.exports = pool.promise();