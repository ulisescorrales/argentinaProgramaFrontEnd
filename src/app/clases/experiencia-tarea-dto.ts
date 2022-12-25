import { ITarea } from "./itarea";


export interface ExperienciaTareaDTO{
    idExperiencia:number;
    organizacion:String;
    descripcion:String;
    logo:String;
    inicio:any;
    fin:any;    
    titulo:String;  


    tareas:ITarea[];
}
