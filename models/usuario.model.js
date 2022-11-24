//Linea de comando para la base de datos
const db = require('../util/database');
const bcrypt = require('bcryptjs')
module.exports = class Usuario {

  constructor(username,password, nombres, primer_apellido, segundo_apellido, telefono, email){  
    this.username = username;
    this.password = password;
    this.nombres = nombres ? nombres : '' ;
    this.primer_apellido = primer_apellido ? primer_apellido : '' ;
    this.segundo_apellido = segundo_apellido ? segundo_apellido : '';
    this.telefono = telefono ? telefono : '';
    this.email = email ? email : '';
  }

  static fetchAll() {
      return db.execute('SELECT * FROM Usuario');
  }

  static fetchOne(username){
    return db.execute('SELECT * FROM Usuario WHERE username = ?', [username]);
  }

  static edit(username, nombre, primer_apellido) {
        return db.execute(
            'UPDATE Usuario SET Nombres = ?, Primer_Apellido = ?, Segundo_apellido = ?, Telefono = ?, username = ?, email = ?, password = ? WHERE id = ?', 
            [nombre, primer_apellido, username, telefono, segundo_apellido, email, password]);
            
    }
 
      save(){
        return bcrypt.hash(this.password,12)
          .then((password_cifrado) => {
          return db.execute(
          'INSERT INTO Usuario (username, password, Nombres, Primer_apellido, Segundo_apellido, Telefono, Email) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [this.username,password_cifrado, this.nombres, this.primer_apellido, this.segundo_apellido, this.telefono, this.email]);
          })
          .catch(error =>{
            console.log(error);
          });
  }

  static getUser(username) {
      return db.execute(
          'SELECT * FROM Usuario WHERE username = ?',
          [username]
      );
  }


  static getPermisos(username) {
    return db.execute(
        'CALL get_permisos(?)',
        [username]);
  }

  static getRol(username) {
    return db.execute(
        'CALL get_rol(?)',
        [username]);
  }

  //Stored procedure para borrar un usuario

  static delete_usuario(username){
    return db.execute(
      'CALL delete_usuario(?)',
      [username]
    );
  }

}

  