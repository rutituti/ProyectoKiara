//Linea de comando para la base de datos
const db = require('../util/database');
const bcrypt = require('bcryptjs')
module.exports = class Usuario {

  constructor(contraseña,username){  
    this.username = username;
    this.password = contraseña;
  }

  static fetchAll() {
      return db.execute('SELECT * FROM Clientes');
  }
 
      save(){
        return bcrypt.hash(this.password,12)
          .then((password_cifrado) => {
          return db.execute(
          'INSERT INTO Usuario (username, password) VALUES (?, ?)',
          [this.username,password_cifrado]);
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
}