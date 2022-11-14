//Linea de comando para la base de datos
const db = require('../util/database');

module.exports = class Expediente {

  static EXPEDIENTE_ARRENDATARIO = 5;

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

save(ID_Cliente,ID_TipoDoc,ID_TipoExp,Estado,URL){


  console.log(ID_Cliente,ID_TipoDoc,ID_TipoExp,Estado,URL); 

 
    return db.execute(
    'INSERT INTO Expediente_Cliente(ID_Cliente, ID_TipoDoc, ID_TipoExp, Estado, URL ) VALUES (?,?,?,?,?)',
    [ID_Cliente,ID_TipoDoc,ID_TipoExp,Estado,URL]);


}


}