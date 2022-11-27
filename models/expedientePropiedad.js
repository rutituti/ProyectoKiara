//Linea de comando para la base de datos
const db = require('../util/database');

module.exports = class ExpedienteProp {

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

    static fetchactualizarestado(Estado,ID_Cliente,ID_Tipoexp,ID_Tipoprop,ID_TipoDoc) {
        return db.execute('CALL actualizar_estadodoc(?,?,?,?,?);',[Estado,ID_Cliente,ID_Tipoexp,ID_Tipoprop,ID_TipoDoc]);
    }

    static fetchVerDocPropiedad(IDprop,IDTE) {
        return db.execute('CALL ver_documentos_expropiedad(?,?);',[IDprop,IDTE]);
    }
    save(){ 
        return db.execute(
            'INSERT INTO Expediente_Propiedad(ID_Propiedad, ID_TipoDoc, ID_TipoExp, Estado, URL) VALUES (?,?,?,?,?)',
            [this.ID_Cliente, this.ID_TipoDoc, this.ID_TipoExp, this.estado, this.url]);
    } 

}