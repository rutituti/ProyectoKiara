const db = require('../util/database');

module.exports = class Proceso_CV {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(id_cliente,num_etapa, id_propiedad,tipo_cliente, estado) {
        this.id_cliente = id_cliente;
        this.num_etapa = num_etapa;
        this.id_propiedad = id_propiedad;
        this.tipo_cliente = tipo_cliente;
        this.estado = estado ? estado : 'No Iniciado';
        
        
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save_CV() {
        return db.execute(
            'INSERT INTO Proceso_CompraVenta (ID_Cliente, Numero_etapa, ID_Propiedad,tipoCliente, Estado) VALUES (?, ?, ?, ?,?)', 
            [this.id_cliente, this.num_etapa, this.id_propiedad,this.tipo_cliente, this.estado]);
            
    }

    save_RA() {
        return db.execute(
            'INSERT INTO Proceso_renta (ID_Cliente, Numero_etapa, ID_Propiedad,tipoCliente, Estado) VALUES (?, ?, ?, ?,?)', 
            [this.id_cliente, this.num_etapa, this.id_propiedad,this.tipo_cliente, this.estado]);
            
    }

    static save_proceso(id_asesor, id_cliente, id_propiedad, tipo_cliente){
        return db.execute(
            'INSERT INTO Asesor_cliente (ID_Asesor, ID_Cliente , ID_Propiedad, Tipo_Cliente) VALUES (?, ?, ?, ?)', 
            [id_asesor, id_cliente, id_propiedad, tipo_cliente]);
    }

    static save_proceso_owner(id_asesor, id_cliente, id_propiedad, tipo_cliente){
        return db.execute(
            'UPDATE Asesor_cliente SET ID_Cliente = ?, Tipo_Cliente = ? WHERE Asesor_cliente.ID_Asesor = ? AND Asesor_cliente.ID_Propiedad = ? AND Asesor_cliente.ID_Cliente IS NULL', 
            [id_cliente, tipo_cliente, id_asesor,  id_propiedad ]);
    }

    static edit_RA(id_poc,estado,fecha_start){
        if(fecha_start == ''){
            return db.execute(
                'UPDATE Proceso_renta SET Estado = ? WHERE id = ?', 
            [estado,id_poc]);
        }else{
            return db.execute(
                'UPDATE Proceso_renta SET Estado = ?, Fecha_Start=? WHERE id = ?', 
            [estado,fecha_start,id_poc]);
            
        }

    }

    static edit_CV(id_poc,estado,fecha_start){
        if(fecha_start == ''){
            return db.execute(
                'UPDATE Proceso_CompraVenta SET Estado = ? WHERE ID = ?', 
            [estado,id_poc]);
        }else{
            return db.execute(
                'UPDATE Proceso_CompraVenta SET Estado = ?, Fecha_Start=? WHERE ID = ?', 
            [estado,fecha_start,id_poc]);
            
        }
        
    }

    //Recupera el cronograma de los procesos de venta y compra
    static fetchProcesoCV(id_cliente, id_propiedad) {
        return db.execute('CALL get_procesoCV(?,?);',[id_cliente,id_propiedad]);
    }

    static fetchProcesoRA(id_cliente, id_propiedad) {
        return db.execute('CALL get_procesoRA(?,?);',[id_cliente,id_propiedad]);
    }

    //Recupera las casa en venta y renta
    static fetch_casasVR_idC(id_cliente,operacion) {
        return db.execute('CALL get_casasVR_idC(?,?);',[id_cliente,operacion]);
    }

    //Recupera las casas que el cliente esta comprando
    static fetch_casasC_idC(id_cliente) {
        return db.execute('CALL get_casasC_idC(?);',[id_cliente]);
    }

    //Recupera las casas que el cliente esta alquilando
    static fetch_casasA_idC(id_cliente) {
        return db.execute('CALL get_casasA_idC(?);',[id_cliente]);
    }

    static get_fechaValidaRA(id_proceso)
    {
        return db.execute('SELECT Fecha_Start FROM Proceso_renta WHERE ID=?',[id_proceso]);
    }

    static get_fechaValidaCV(id_proceso)
    {
        return db.execute('SELECT Fecha_Start FROM Proceso_CompraVenta WHERE ID=?',[id_proceso]);
    }

    static fetchCronogramaRA(){
        return db.execute('SELECT * FROM Cronograma_renta');
    }

    static fetchCronogramaCV(){
        return db.execute('SELECT * FROM Cronograma_venta');
    }


}