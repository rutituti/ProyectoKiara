//Linea de comando para la base de datos
const db = require('../util/database');
const bcrypt = require('bcryptjs')
module.exports = class Asesor {

    constructor(username,curp){
    this.username = username
    this.curp = curp; 
    }

    static fetchAll() {
        return db.execute('SELECT * FROM Asesores, Usuario WHERE Asesores.username = Usuario.username');
    }
    static get_clientes(user){
        return db.execute('CALL get_clientes_idAsesor(?);',[user]);
    }
    //Este método servirá para guardar de manera persitente el nuevo objeto
        //Inserta un nuevo elemento en la tabla
    save(){   
        return db.execute(
            'INSERT INTO Asesores (username, CURP) VALUES (?, ?)',
        [this.username,this.curp]);          
    }

    static get_personalInfo(user){
        return db.execute('CALL get_asesor(?);',[user]);
    }

    //Stored procedure para instruccion SQL de borrar asesor

    static delete_Asesor(user){
        return db.execute('CALL delete_asesor(?);',[user]);
    }

}