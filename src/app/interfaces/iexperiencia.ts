import { ITarea } from "./itarea";


export interface IExperiencia {
    idExperiencia:number;
    organizacion:String;
    descripcion:String;
    logo:String;
    inicio:String;
    fin:String;
    titulo:String;
    tareas:ITarea[];
}
