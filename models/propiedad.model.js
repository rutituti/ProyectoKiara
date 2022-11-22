const db = require('../util/database');

module.exports = class Propiedad{
    //constructor
    constructor(atributos){
        ID                              =   atributos.ID;
        ID_tipoInmueble                 =   atributos.ID_tipoInmueble;
        Calle                           =   atributos.Calle;
        Numero                          =   atributos.Numero;
        Colonia                         =   atributos.Colonia;
        Codigo_postal                   =   atributos.Codigo_postal;
        Municipio                       =   atributos.Municipio;
        Estado                          =   atributos.Estado;
        ID_Pais                         =   atributos.ID_Pais;
        Longitud                        =   atributos.Longitud;
        Latitud                         =   atributos.Latitud;
        Operacion                       =   atributos.Operacion;
        Terreno                         =   atributos.Terreno;
        Privada_calle                   =   atributos.Privada_calle;
        Precio                          =   atributos.Precio;
        Uso_suelo                       =   atributos.Uso_suelo;
        Construccion                    =   atributos.Construccion;
        Descripcion                     =   atributos.Descripcion;
        Imagen                          =   atributos.Imagen;
        Niveles                         =   atributos.Niveles;
        Habitaciones                    =   atributos.Habitaciones;
        Baños                           =   atributos.Baños;
        Sala_comedor                    =   atributos.Sala_comedor;
        Cocina                          =   atributos.Cocina;
        Estacionamiento                 =   atributos.Estacionamiento;
        Gas                             =   atributos.Gas;
        Servicio_agua                   =   atributos.Servicio_agua;
        Servicio_luz                    =   atributos.Servicio_luz;
        Servicio_Drenaje                =   atributos.Servicio_Drenaje;
        Tipo_desnivel                   =   atributos.Tipo_desnivel;
        Forma_terreno                   =   atributos.Forma_terreno;
        Medidas_fondo                   =   atributos.Medidas_fondo
        Medidas_frente                  =   atributos.Medidas_frente;
    }
    //Método para salvar propiedades
    save() {
        return db.execute(
            'INSERT INTO Propiedades (ID, ID_tipoInmueble, Calle, Numero, Colonia, Codigo_postal, Municipio, Estado, ID_Pais, Longitud, Latitud, Operacion, Terreno, Privada_calle, Precio, Uso_suelo, Construccion, Descripcion, Imagen, Niveles, Habitaciones, Baños, Sala_comedor, Cocina, Estacionamiento, Gas, Servicio_agua, Servicio_luz, Servicio_Drenaje, Tipo_desnivel, Forma_terreno, Medidas_frente, Medidas_fondo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, )', 
            [this.ID, this.ID_tipoInmueble,
                this.Calle,
                this.Numero,
                this.Colonia,
                this.Codigo_postal,
                this.Municipi,
                this.Estado,
                this.ID_Pais,
                this.Longitud,
                this.Latitud,
                this.Operacion,
                this.Terreno,
                this.Privada_calle,
                this.Precio,
                this.Uso_suelo,
                this.Construccion,
                this.Descripcion,
                this.Imagen,
                this.Niveles,
                this.Habitaciones,
                this.Baños,
                this.Sala_comedor,
                this.Cocina,
                this.Estacionamiento,
                this.Gas,
                this.Servicio_agua,
                this.Servicio_luz,
                this.Servicio_Drenaje,
                this.Tipo_desnivel,
                this.Forma_terreno,
                this.Medidas_fondo,
                this.Medidas_frente]);  
    }
    //Instruccion SQL para recuperar todas las propiedades
    static fetchAll() {
        return db.execute('SELECT * FROM Propiedades');
    }
    //Instruccion SQL para ver solo propiedades en renta
    static fetchRenta(){
        return db.execute('SELECT * FROM Propiedades WHERE Operacion = "Renta"');
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