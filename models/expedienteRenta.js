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
static fetchDocsVendedor() {
    return db.execute('SELECT Te.tipoExpCliente , R.ID_tipoExpC, R.ID_tipoDocC, Td.Nombre FROM Tipo_ExpCliente Te, Restriccion_TED_cliente R, Tipo_docCliente Td  WHERE  R.ID_tipoExpC = Te.ID AND Te.ID=1  AND Td.ID = R.ID_tipoDocC');
}
//Documentos necesarios por el CopropiatarioVendedor
static fetchDocsCopVendedor() {
    return db.execute('SELECT Te.tipoExpCliente , R.ID_tipoExpC, R.ID_tipoDocC, Td.Nombre  FROM Tipo_ExpCliente Te, Restriccion_TED_cliente R, Tipo_docCliente Td  WHERE  R.ID_tipoExpC = Te.ID AND Te.ID=2  AND Td.ID = R.ID_tipoDocC');
}
//Documentos necesarios por el Comprador
static fetchDocsComprador() {
    return db.execute('SELECT Te.tipoExpCliente , R.ID_tipoExpC, R.ID_tipoDocC, Td.NombreFROM Tipo_ExpCliente Te, Restriccion_TED_cliente R, Tipo_docCliente Td WHERE  R.ID_tipoExpC = Te.ID AND Te.ID=3  AND Td.ID = R.ID_tipoDocC');
}
//Documentos necesarios por el CopropietarioVendedor
static fetchDocsCopComprador() {
    return db.execute('SELECT Te.tipoExpCliente , R.ID_tipoExpC, R.ID_tipoDocC, Td.Nombre   FROM Tipo_ExpCliente Te, Restriccion_TED_cliente R, Tipo_docCliente Td WHERE  R.ID_tipoExpC = Te.ID AND Te.ID=4  AND Td.ID = R.ID_tipoDocC');
}
//Documentos necesarios por el arrendatario
static fetchDocsArrendatario() {
      return db.execute('SELECT Te.tipoExpCliente , R.ID_tipoExpC, R.ID_tipoDocC, Td.Nombre FROM Tipo_ExpCliente Te, Restriccion_TED_cliente R, Tipo_docCliente Td WHERE  R.ID_tipoExpC = Te.ID AND Te.ID=5  AND Td.ID = R.ID_tipoDocC');
  }
//Documentos necesarios por el Obligado Solidario
static fetchDocsObligadoSolidario() {
    return db.execute('SELECT Te.tipoExpCliente , R.ID_tipoExpC, R.ID_tipoDocC, Td.Nombre FROM Tipo_ExpCliente Te, Restriccion_TED_cliente R, Tipo_docCliente Td WHERE  R.ID_tipoExpC = Te.ID AND Te.ID=6  AND Td.ID = R.ID_tipoDocCSELECT * FROM Tipo_ExpCliente Te, Restriccion_TED_cliente R, Tipo_docCliente Td WHERE  R.ID_tipoExpC = Te.ID AND Te.ID=6  AND Td.ID = R.ID_tipoDocC');
}
//Documentos necesarios por el arrendador
static fetchDocsArrendador() {
    return db.execute('SELECT Te.tipoExpCliente , R.ID_tipoExpC, R.ID_tipoDocC, Td.Nombre FROM Tipo_ExpCliente Te, Restriccion_TED_cliente R, Tipo_docCliente Td WHERE  R.ID_tipoExpC = Te.ID AND Te.ID=7  AND Td.ID = R.ID_tipoDocC');
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