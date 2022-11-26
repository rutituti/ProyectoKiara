const db = require('../util/database');

module.exports = class Propiedad{
    //constructor
    constructor(atributos){
        this.ID_tipoInmueble                 =   atributos.ID_tipoInmueble,
        this.Calle                           =   atributos.Calle,
        this.Numero                          =   atributos.Numero,
        this.Colonia                         =   atributos.Colonia;
        this.Codigo_postal                   =   atributos.Codigo_postal;
        this.Municipio                       =   atributos.Municipio;
        this.Estado                          =   atributos.Estado;
        this.ID_Pais                         =   atributos.ID_Pais,
        this.Longitud                        =   atributos.Longitud,
        this.Latitud                         =   atributos.Latitud,
        this.Operacion                       =   atributos.Operacion;
        this.Terreno                         =   atributos.Terreno;
        this.Privada_calle                   =   atributos.Privada_calle;
        this.Precio                          =   atributos.Precio;
        this.Uso_suelo                       =   atributos.Uso_suelo;
        this.Construccion                    =   atributos.Construccion;
        this.Descripcion                     =   atributos.Descripcion;
        this.Imagen                          =   atributos.Imagen,
        this.Imagen1                         =   atributos.Imagen1,
        this.Imagen2                         =   atributos.Imagen2,
        this.Imagen3                         =   atributos.Imagen3,
        this.Imagen4                         =   atributos.Imagen4,
        this.Niveles                         =   atributos.Niveles;
        this.Habitaciones                    =   atributos.Habitaciones;
        this.banios                          =   atributos.banios;
        this.Sala_comedor                    =   atributos.Sala_comedor;
        this.Cocina                          =   atributos.Cocina;
        this.Estacionamiento                 =   atributos.Estacionamiento;
        this.Gas                             =   atributos.Gas;
        this.Servicio_agua                   =   atributos.Servicio_agua;
        this.Servicio_luz                    =   atributos.Servicio_luz;
        this.Servicio_Drenaje                =   atributos.Servicio_Drenaje;
        this.Tipo_desnivel                   =   atributos.Tipo_desnivel;
        this.Forma_terreno                   =   atributos.Forma_terreno;
        this.Medidas_fondo                   =   atributos.Medidas_fondo
        this.Medidas_frente                  =   atributos.Medidas_frente;
    }
    //Método para salvar propiedades
    save() {
        return db.execute(
            'INSERT INTO Propiedades (ID_tipoInmueble, Calle, Numero, Colonia, Codigo_postal, Municipio, Estado, ID_Pais, Longitud, Latitud, Operacion, Terreno, Privada_calle, Precio, Uso_suelo, Construccion, Descripcion, Imagen, Imagen1, Imagen2, Imagen3, Imagen4, Niveles, Habitaciones, Baños, Sala_comedor, Cocina, Estacionamiento, Gas, Servicio_agua, Servicio_luz, Servicio_Drenaje, Tipo_desnivel, Forma_terreno, Medidas_frente, Medidas_fondo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [
                this.ID_tipoInmueble, //
                this.Calle, //
                this.Numero, //
                this.Colonia, //
                this.Codigo_postal, //
                this.Municipio, //
                this.Estado, //
                this.ID_Pais, //
                this.Longitud, //
                this.Latitud, //
                this.Operacion, //
                this.Terreno, //
                this.Privada_calle, //
                this.Precio, //
                this.Uso_suelo, //
                this.Construccion, //
                this.Descripcion, //
                this.Imagen, 
                this.Imagen1,
                this.Imagen2,
                this.Imagen3,
                this.Imagen4,//
                this.Niveles, //
                this.Habitaciones, //
                this.banios, //
                this.Sala_comedor, //
                this.Cocina, //
                this.Estacionamiento, //
                this.Gas, //
                this.Servicio_agua, //
                this.Servicio_luz, //
                this.Servicio_Drenaje, //
                this.Tipo_desnivel, //
                this.Forma_terreno, //
                this.Medidas_fondo,  //
                this.Medidas_frente]); // 
    }
    //Instruccion SQL para recuperar todas las propiedades
    static fetchAll() {
        return db.execute('SELECT * FROM Propiedades');
    }
    //Instruccion SQL para ver solo propiedades en renta
    static fetchRenta(){
        return db.execute('SELECT * FROM Propiedades WHERE Operacion = "Renta"');
    }
    // Obtener la propiedad solcitada
    static getHome(valor_casa) {
        return db.execute(
            'CALL get_casa(?)',
            [valor_casa]
        );
    }
    //Instruccion SQL para ver solo propidades en venta
    
    static fetchVenta(){
        return db.execute('SELECT * FROM Propiedades WHERE Operacion = "Venta"');
    }

   
    
    //Instruccion SQL para recuperar propiedad por ID
    static fetchPropiedad(ID){
        return db.execute('SELECT * FROM Propiedades WHERE ID = ?', [ID]);
    }
    //Instruccion SQL para buscar propiedad
    static find(valor_busqueda) {
        return db.execute('SELECT * FROM Propiedades WHERE Colonia LIKE ? OR Municipio LIKE ? OR Calle LIKE ? AND Operacion = "Renta" OR Operacion = "Venta"', ['%'+valor_busqueda+'%', '%'+valor_busqueda+'%', '%'+valor_busqueda+'%']);
    }

    //Instruccion SQL para buscar propiedad en RENTA

    static findR(valor_busqueda){
        return db.execute('SELECT * FROM Propiedades WHERE Colonia LIKE ? OR Municipio LIKE ? OR Calle LIKE ? AND Operacion = "Renta"', ['%'+valor_busqueda+'%', '%'+valor_busqueda+'%', '%'+valor_busqueda+'%']);
    }

    //Instruccion SQL para buscar propiedad en VENTA

    static findV(valor_busqueda){
        return db.execute('SELECT * FROM Propiedades WHERE Colonia LIKE ? OR Municipio LIKE ? OR Calle LIKE ? AND Operacion = "Venta"', ['%'+valor_busqueda+'%', '%'+valor_busqueda+'%', '%'+valor_busqueda+'%']);
    }

    //Instruccion SQL para editar propiedad
    static edit(id, nombre, descripcion) {
        return db.execute(
            'UPDATE robots SET nombre = ?, descripcion = ? WHERE id = ?', 
            [nombre, descripcion, id]);
            
    }
    static delete_propiedad(ID){
        return db.execute(
          'CALL delete_usuario(?)',
          [ID]
        );
    }
    static update_VR(ID,Precio){
        return db.execute(
            'CALL update_VenRen(?,?)',
            [ID,Precio]
        );
    }
    static update_RV(ID,Precio){
        return db.execute(
            'CALL update_RenVen(?,?)',
            [ID,Precio]
        );
    }
}