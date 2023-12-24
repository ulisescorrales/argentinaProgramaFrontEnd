import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Alerta } from '../interfaces/alerta';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {
//Servicio que notifica desde los router-outlet si una operación fue exitosa para que aparezca 
//un mensaje de confirmación desde la página principal

  mensaje=new Subject<Alerta>();
  constructor() {}

  getMensaje():Subject<Alerta>{
    return this.mensaje;
  }

  comunicarMensaje(mensaje1:String,tipoAlerta1:String){
    this.mensaje.next({
      mensaje:mensaje1,
      tipoAlerta:tipoAlerta1
    });
  }
}
