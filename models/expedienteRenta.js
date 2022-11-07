//Linea de comando para la base de datos
const db = require('../util/database');
const bcrypt = require('bcryptjs')
module.exports = class Expediente {

  constructor(ID_Cliente,ID_TipoDoc,ID_TipoExp,Estado,URLP){
    this.ID_Cliente = ID_Cliente;
    this.ID_TipoDoc = ID_TipoDoc;
    this.ID_TipoExp = ID_TipoExp;
    this.Estado = Estado;
    this.URLP= URLP;
 
}

  static fetchDocsArrendatario() {
      return db.execute('SELECT * FROM Tipo_ExpCliente Te, Restriccion_TED_cliente R, Tipo_docCliente Td WHERE  R.ID_tipoExpC = Te.ID AND Te.ID=5  AND Td.ID = R.ID_tipoDocC');
  }
  //Este método servirá para guardar de manera persitente el nuevo objeto
        //Inserta un nuevo elemento en la tabla
  /*    save(){   
           return db.execute(
              'INSERT INTO Clientes (username, Nombres, Primer_apellido, Segundo_apellido, Telefono_cliente, Email_cliente, Ocupacion, Estado_civil) VALUES (?,?, ?, ?, ?, ?, ?, ?)',
              [this.username,this.Nombres,this.primerApellido,this.segundoApellido,this.telefono,this.email,this.ocupacion,this.estado]);          
      }

      static fetch_profile_id(user){
        return db.execute('CALL get_cliente(?);',[user]);
      }
*/

}