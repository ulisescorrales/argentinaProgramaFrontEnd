import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InicioService {
  //Servicio usado para contabilizar los componentes cargados (con o sin errores) durante el inicio de la página
  cant:number = 0;  
  constructor() {        
  }

  sumarComponenteCargado() {
    this.cant++;        
    //Cuando terminan de realizarse todas las peticiones HTTP 
    //el spinner desaparece    
    if (this.cant == 7) {
      const x = document.getElementById('status');
      if (x != null) {
        x.style.display = "none";
      }
    }        
  }

}
