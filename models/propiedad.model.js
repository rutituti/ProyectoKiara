const db = require('../util/database');

module.exports = class Propiedad{
    constructor(ID,ID_tipoInmueble,Calle,Numero,Colonia,Codigo_postal,Municipio,Estado,ID_Pais,Longitud,Latitud,Operacion,Terreno,Privada_calle,Precio,Uso_suelo,Construccion,Descripcion,Imagen,Niveles,Habitaciones,Baños,Sala_comedor,Cocina,Estacionamiento,Gas,Servicio_agua,Servicio_luz,Servicio_Drenaje,Tipo_desnivel,Forma_terreno,Medidas_frente,Medidas_fondo){
        this.ID=ID;
        this.ID_tipoInmueble=ID_tipoInmueble;
        this.Calle=Calle;
        this.Numero=Numero;
        this.Colonia=Colonia;
        this.Codigo_postal=Codigo_postal;
        this.Municipio=Municipio;
        this.Estado=Estado;
        this.ID_Pais=ID_Pais;
        this.Longitud=Longitud;
        this.Latitud=Latitud;
        this.Operacion=Operacion;
        this.Terreno=Terreno;
        this.Privada_calle=Privada_calle;
        this.Precio=Precio;
        this.Uso_suelo=Uso_suelo;
        this.Construccion=Construccion;
        this.Descripcion=Descripcion;
        this.Imagen=Imagen;
        this.Niveles=Niveles;
        this.Habitaciones=Habitaciones;
        this.Baños=Baños;
        this.Sala_comedor=Sala_comedor;
        this.Cocina=Cocina;
        this.Estacionamiento=Estacionamiento;
        this.Gas=Gas;
        this.Servicio_agua=Servicio_agua;
        this.Servicio_luz=Servicio_luz;
        this.Servicio_Drenaje=Servicio_Drenaje;
        this.Tipo_desnivel=Tipo_desnivel;
        this.Forma_terreno=Forma_terreno;
        this.Medidas_fondo=Medidas_fondo
        this.Medidas_frente=Medidas_frente;
    }
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
    static fetchAll() {
        return db.execute('SELECT * FROM Propiedades');
    }

    static fetchPropiedad(){
        return db.execute('SELECT * FROM Propiedades WHERE ID = ?', [ID]);
    }
}