import { Tarea } from "./tarea";

export class Experiencia {
    private tarea:Array<Tarea>;    
    private institucion:String;
    private resumen:String;
    private comienzo:String;
    private finalizacion:String;
    private logo:String;

    constructor(tarea:Array<Tarea>,institucion:String,comienzo:String,finalizacion:String,logo:String,resumen:String){
        if(tarea!=null){
            this.tarea=tarea;            
        }else{
            this.tarea=new Array<Tarea>;
        }
        this.institucion=institucion;
        this.comienzo=comienzo;
        this.finalizacion=finalizacion;
        this.logo=logo;
        this.resumen=resumen;
    }    
}
