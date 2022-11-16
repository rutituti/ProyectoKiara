//Linea de comando para la base de datos
const db = require('../util/database');

module.exports = class Expediente {

    static EXPEDIENTE_VENTA  = 1;
    static EXPEDIENTE_RENTA  = 2;


    constructor(ID_Cliente, ID_TipoDoc, ID_TipoExp, Estado, URL){
        this.ID_Cliente = ID_Cliente;
        this.ID_TipoDoc = ID_TipoDoc;
        this.ID_TipoExp = ID_TipoExp;
        this.estado = Estado;
        this.url = URL;
    }

    //Documentos necesarios por el Vendedor
    static fetchDocsProp(ID_TiEP) {
        return db.execute('CALL get_docs_propiedades(?);',[ID_TiEP]);
    }
/* 
    save(){ 
        return db.execute(
            'INSERT INTO Expediente_Cliente(ID_Cliente, ID_TipoDoc, ID_TipoExp, Estado, URL) VALUES (?,?,?,?,?)',
            [this.ID_Cliente, this.ID_TipoDoc, this.ID_TipoExp, this.estado, this.url]);
    } */

}