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

//Documentos necesarios por el Vendedor
static fetchDocsVendedor(ID_TiEC) {
    return db.execute('CALL get_docs(?);',[ID_TiEC]);
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