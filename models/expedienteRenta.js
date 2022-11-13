//Linea de comando para la base de datos
const db = require('../util/database');
const bcrypt = require('bcryptjs')
module.exports = class Expediente {

  constructor(ID_TipoDoc,ID_TipoExp,Estado,URLP){

    this.ID_TipoDoc = ID_TipoDoc;
    this.ID_TipoExp = ID_TipoExp;
    this.Estado = Estado;
    this.URLP= URLP;
 
}

//Documentos necesarios por el Vendedor
static fetchDocsVendedor(ID_TiEC) {
    return db.execute('CALL get_docs(?);',[ID_TiEC]);
}

save(ID_Cliente,ID_TipoDoc,ID_TipoExp,Fecha,Estado,URL){

  console.log('HOLA');
  console.log(ID_Cliente,ID_TipoDoc,ID_TipoExp,Fecha,Estado,URL);

 
    return db.execute(
    'INSERT INTO Expediente_Cliente(ID_Cliente, ID_TipoDoc, ID_TipoExp, Estado, URL ) VALUES (?,?,?,?,?)',
    [ID_Cliente,ID_TipoDoc,ID_TipoExp,Estado,URL]);


}


}