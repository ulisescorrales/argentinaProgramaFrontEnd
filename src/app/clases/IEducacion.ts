export interface IEducacion {
     idEstudio:number;
     titulo:String;     
     institucion:String;
     logo:String;
     estado:String;
     anioIngreso:number;     
     materiasTotales:number;
     materiasAprobadas:number;     
     anioFinalizacion:number;
     duracion:String;

    /*constructor(titulo:String,institucion:String,estado:String,comienzo:number,finalizacion:number,logo:String){
        this.titulo=titulo;
        this.institucion=institucion;
        this.estado=estado;
        this.comienzo=comienzo;
        this.finalizacion=finalizacion;
        this.logoInstitucion=logo;
    }*/
}
