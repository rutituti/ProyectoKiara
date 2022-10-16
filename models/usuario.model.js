//Linea de comando para la base de datos
const db = require('../util/database');

module.exports = class Usuario {

  constructor(Nombres,primerApellido,segundoApellido,email,telefono,ocupacion,estado){
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
  /*static fetchOne(id) {
    return db.execute('SELECT * FROM Clientes WHERE id = ?',[id]);
}
*/

  //Este método servirá para guardar de manera persitente el nuevo objeto
        //Inserta un nuevo elemento en la tabla
        save(){
           return db.execute(
                'INSERT INTO Clientes (Nombres, Primer_apellido, Segundo_apellido, Telefono_cliente, Email_cliente, Ocupacion, Estado_civil) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [this.Nombres,this.primerApellido,this.segundoApellido,this.telefono,this.email,this.ocupacion,this.estado]);
        }
}
/*module.exports = class Usuario{
        

        //Este método servirá para guardar de manera persitente el nuevo objeto
        //Inserta un nuevo elemento en la tabla
        /*save(){
           return db.execute(
                'SELECT * FROM clientes (ID_cliente,Nombre(s),Primer_apellido,Segundo_apellido,Telefono_cliente,Email_cliente,Ocupacion,Estado_civil) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [this.id_cliente,this.nombre,this.primer_apellido,this.segundo_apellido,this.telefono,this.mail,this.ocupacion,this.estado_civil]);
        }*/
//}