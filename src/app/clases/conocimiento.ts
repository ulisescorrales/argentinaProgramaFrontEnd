import { timeStamp } from "console";

export class Conocimiento {
    private programa:String;
    private logo:String;
    private level:number;    

    constructor(programa:String,logo:String,level:number){
        this.programa=programa;
        this.level=level;
        this.logo=logo;
    }
}
