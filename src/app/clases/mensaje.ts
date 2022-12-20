export class Mensaje {
    private id: Number;
    private organizacion: String;
    private contacto: String;
    private mensaje: String;    

    constructor(id:Number,org:String,cont:String,msg:String){
        this.id=id;
        this.organizacion=org;
        this.contacto=cont;
        this.mensaje=msg;
    }
}
