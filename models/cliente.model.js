//Linea de comando para la base de datos
const db = require('../util/database');
const bcrypt = require('bcryptjs')
module.exports = class Cliente {

  constructor(Nombres,primerApellido,segundoApellido,telefono,email,ocupacion,estado,contraseña,username){
    this.Nombres = Nombres;
    this.primerApellido = primerApellido;
    this.segundoApellido = segundoApellido;
    this.telefono = telefono;
    this.email = email;
    this.ocupacion = ocupacion;
    this.estado = estado;
}

  static fetchAll() {
      return db.execute('SELECT * FROM Clientes');
  }
  //Este método servirá para guardar de manera persitente el nuevo objeto
        //Inserta un nuevo elemento en la tabla
      save(){
          /*return db.execute(
                'INSERT INTO Clientes (Nombres, Primer_apellido, Segundo_apellido, Telefono_cliente, Email_cliente, Ocupacion, Estado_civil, contraseña) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [this.Nombres,this.primerApellido,this.segundoApellido,this.telefono,this.email,this.ocupacion,this.estado, this.contraseña]);*/
          
          return bcrypt.hash(this.contraseña,12)
          .then((password_cifrado) => {
            return db.execute(
              'INSERT INTO Clientes (Nombres, Primer_apellido, Segundo_apellido, Telefono_cliente, Email_cliente, Ocupacion, Estado_civil) VALUES (?, ?, ?, ?, ?, ?, ?)',
              [this.Nombres,this.primerApellido,this.segundoApellido,this.telefono,this.email,this.ocupacion,this.estado]);
              
            })
            .catch(error =>{
              console.log(error);
            });
      }
      static fetch_profile_id(user){
        return db.execute('CALL get_cliente(?);',[user]);
      }

}