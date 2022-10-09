//Linea de comando para la base de datos
//const db = require('../util/database');

module.exports = class usuario{
        constructor(nombre,apellidos,user,mail,direccion,pais,estado,cp){
            this.nombre = nombre;
            this.apellidos = apellidos;
            this.user = user;
            this.mail = mail;
            this.direccion = direccion;
            this.pais = pais;
            this.estado = estado;
            this.cp = cp;
        }

        //Este método servirá para guardar de manera persitente el nuevo objeto
        //Inserta un nuevo elemento en la tabla
        save(){
            return db.execute(
                'INSERT INTO usuario (nombre, apellidos, usuario,mail,direccion,pais,estado,cp) VALUES (?, ?, ?, ?)',
                [this.nombre, this.apellidos,this.user,this.mail,this.direccion,this.pais,this.estado,this.cp]);
            
        }

}