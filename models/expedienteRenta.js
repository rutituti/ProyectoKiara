//Linea de comando para la base de datos
const db = require('../util/database');

module.exports = class Expediente {

    static EXPEDIENTE_VENDEDOR        = 1;
    static EXPEDIENTE_COPROPVENDEDOR  = 2;
    static EXPEDIENTE_COMPRADOR       = 3;
    static EXPEDIENTE_COPROPCOMPRADOR = 4;
    static EXPEDIENTE_ARRENDATARIO    = 5;
    static EXPEDIENTE_OBLIGADOSOLID   = 6;
    static EXPEDIENTE_ARRENDADOR      = 7;


    constructor(ID_Cliente,IDpropiedad, ID_TipoDoc, ID_TipoExp, Estado, URL){
        this.ID_Cliente = ID_Cliente;
        this.ID_TipoDoc = ID_TipoDoc;
        this.ID_TipoExp = ID_TipoExp;
        this.estado = Estado;
        this.url = URL;
        this.IDpropiedad = IDpropiedad;
    }

    //Documentos necesarios por el Vendedor
    static fetchDocsVendedor(ID_TiEC) {
        return db.execute('CALL get_docs(?);',[ID_TiEC]);
    }
    static fetchactualizarestado(Estado,ID_Cliente,ID_Tipoexp,ID_Tipoprop,ID_TipoDoc) {
       
        
        return db.execute('CALL actualizar_estadodoc(?,?,?,?,?);',[Estado,ID_Cliente,ID_Tipoexp,ID_Tipoprop,ID_TipoDoc]);
    }
    
    static fetchVerDocCliente(ID_TD,IDTE,IDprop) {
        return db.execute('CALL ver_documentos_expediente(?,?,?);',[ID_TD,IDTE,IDprop]);
    }

    save(){ 
        return db.execute(
            'INSERT INTO Expediente_Cliente(ID_Cliente, Id_propiedad, ID_TipoDoc, ID_TipoExp, Estado, URL) VALUES (?,?,?,?,?,?)',
            [this.ID_Cliente,  this.IDpropiedad, this.ID_TipoDoc, this.ID_TipoExp, this.estado, this.url]);
    }

}