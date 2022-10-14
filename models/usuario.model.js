//Linea de comando para la base de datos
const db = require('../util/database');

module.exports = class Usuario {

  static fetchAll() {
      return db.execute('SELECT * FROM Clientes');
  }
  static fetchOne(id) {
    return db.execute('SELECT * FROM Clientes WHERE id = ?',[id]);
}

  //Este método servirá para guardar de manera persitente el nuevo objeto
        //Inserta un nuevo elemento en la tabla
        save(){
           return db.execute(
                'SELECT * FROM Clientes (ID,Nombre(s),Primer_apellido,Segundo_apellido,Telefono_cliente,Email_cliente,Ocupacion,Estado_civil) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [this.id_cliente,this.nombre,this.primer_apellido,this.segundo_apellido,this.telefono,this.mail,this.ocupacion,this.estado_civil]);
        }
}
/*module.exports = class Usuario{
        constructor(id_cliente,nombre,primier_apellido,segundo_apellido,telefono,mail,ocupacion,estado_civil){
            this.id_cliente = id_cliente;
            this.nombre = nombre;
            this.primier_apellido = primier_apellido;
            this.segundo_apellido = segundo_apellido;
            this.telefono = telefono;
            this.mail = mail;
            this.ocupacion = ocupacion;
            this.estado_civil = estado_civil;
        }

        //Este método servirá para guardar de manera persitente el nuevo objeto
        //Inserta un nuevo elemento en la tabla
        /*save(){
           return db.execute(
                'SELECT * FROM clientes (ID_cliente,Nombre(s),Primer_apellido,Segundo_apellido,Telefono_cliente,Email_cliente,Ocupacion,Estado_civil) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [this.id_cliente,this.nombre,this.primer_apellido,this.segundo_apellido,this.telefono,this.mail,this.ocupacion,this.estado_civil]);
        }*/
//}