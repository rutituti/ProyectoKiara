//Linea de comando para la base de datos
const db = require('../util/database');
const bcrypt = require('bcryptjs')
module.exports = class Usuario {

  constructor(username,contraseña, nombres, primer_apellido, segundo_apellido, telefono, email){  
    this.username = username;
    this.password = contraseña;
    this.nombres = nombres ? nombres : '' ;
    this.primer_apellido = primer_apellido ? primer_apellido : '' ;
    this.segundo_apellido = segundo_apellido ? segundo_apellido : '';
    this.telefono = telefono ? telefono : '';
    this.email = email ? email : '';
  }

  static fetchAll() {
      return db.execute('SELECT * FROM Usuario');
  }

  static edit(username, nombre, primer_apellido) {
        return db.execute(
            'UPDATE Usuario SET Nombres = ?, Primer_Apellido = ? WHERE id = ?', 
            [nombre, primer_apellido, username]);
            
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

  



}

  