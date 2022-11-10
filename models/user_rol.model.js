//Linea de comando para la base de datos
const db = require('../util/database');
const bcrypt = require('bcryptjs')
module.exports = class User_Rol {

    constructor(id_user,id_rol){
    this.id_user = id_user
    this.id_rol = id_rol; 
    }

    static fetchAll() {
        return db.execute('SELECT * FROM user_rol');
    }
    //Este método servirá para guardar de manera persitente el nuevo objeto
        //Inserta un nuevo elemento en la tabla
    save(){   
        return db.execute(
            'INSERT INTO user_rol (id_user, id_rol) VALUES (?, ?)',
        [this.id_user,this.id_rol]);          
    }

}