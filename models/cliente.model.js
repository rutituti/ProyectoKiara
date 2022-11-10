//Linea de comando para la base de datos
const db = require('../util/database');
const bcrypt = require('bcryptjs')
module.exports = class Cliente {

  constructor(username,ocupacion,estado){
    this.username = username;
    this.ocupacion = ocupacion;
    this.estado = estado;
}

  static fetchAll() {
      return db.execute('SELECT * FROM Clientes');
  }
  //Este método servirá para guardar de manera persitente el nuevo objeto
        //Inserta un nuevo elemento en la tabla
      save(){   
           return db.execute(
              'INSERT INTO Clientes (username, Ocupacion, Estado_civil) VALUES (?, ?, ?)',
              [this.username,this.ocupacion,this.estado]);          
      }

      static get_personalInfo(user){
        return db.execute('CALL get_cliente(?);',[user]);
      }

      //Stored procedure para eliminar cliente
  static delete_cliente(username){
      return db.execute(
      'CALL delete_cliente(?)',
      [username]);
  }
}