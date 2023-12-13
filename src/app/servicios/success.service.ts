import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuccessService {
//Servicio que notifica desde los router-outlet si una operación fue exitosa para que aparezca 
//un mensaje de confirmación desde la página principal

  success=new Subject<String>();
  constructor() {}

  getSucces(){    
    return this.success;
  }

  comunicateSuccess(mensaje:String){
    this.success.next(mensaje);
  }
}
