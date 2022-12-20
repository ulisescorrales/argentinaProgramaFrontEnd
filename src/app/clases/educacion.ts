export class Educacion {
    private titulo:String;
    private institucion:String;
    private logoInstitucion:String;
    private estado:String;
    private comienzo:number;
    private finalizacion:number;

    constructor(titulo:String,institucion:String,estado:String,comienzo:number,finalizacion:number,logo:String){
        this.titulo=titulo;
        this.institucion=institucion;
        this.estado=estado;
        this.comienzo=comienzo;
        this.finalizacion=finalizacion;
        this.logoInstitucion=logo;
    }
}
