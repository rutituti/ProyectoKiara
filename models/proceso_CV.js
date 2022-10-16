const db = require('../util/database');

module.exports = class Proceso_V {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(num_etapa, estado, propiedad, Fecha_end) {
        this.num_etapa = num_etapa;
        this.estado = estado ? estado : 'No Iniciado';
        this.propiedad = propiedad;
        this.Fecha_end = Fecha_end ? Fecha_end: '0000-00-00';
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save(id_cliente, id_propiedad,tipo_cliente) {
        return db.execute(
            'INSERT INTO Proceso_CompraVenta (ID_Cliente, Numero_etapa, ID_Propiedad,Tipo_Cliente, Estado, Fecha_EndV) VALUES (?, ?, ?, ?,?)', 
            [id_cliente, this.num_etapa, id_propiedad,tipo_cliente, this.estado, this.Fecha_end]);
            
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchProceso(id_cliente, id_propiedad) {
        return db.execute('CALL proceso_V(?,?);',[id_cliente,id_propiedad]);
    }


}