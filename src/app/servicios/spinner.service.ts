import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  //Servicio usado para contabilizar los componentes cargados (con o sin errores) durante el inicio de la página
  //y para la visualización del spinner de carga
  cant:number = 0;  
  //cargado=new BehaviorSubject<boolean>(false);     
  cargando=new BehaviorSubject<boolean>(true);
  constructor() {        
  }  
  getCargando(){        
    return this.cargando;
  }
  sumarComponenteCargado() {    
    this.cant++;            
    //Cuando terminan de realizarse todas las peticiones HTTP 
    //el spinner desaparece    
    if (this.cant == 7) {
      this.cargando.next(false);      
    }        
  }
  mostrarSpinner(){
    this.cargando.next(true);
  }
  borrarSpinner(){
    this.cargando.next(false);
  }
}
