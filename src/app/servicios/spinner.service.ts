import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  //Servicio usado para contabilizar los componentes cargados (con o sin errores) durante el inicio de la página
  //y para la visualización del spinner de carga
  cant:number = 0;  
  max:number=8
  //cargado=new BehaviorSubject<boolean>(false);     
  cargando=new BehaviorSubject<boolean>(true);
  constructor(@Inject(DOCUMENT) private document: Document) {        
  }  
  getCargando(){        
    return this.cargando;
  }
  sumarComponenteCargado() {    
    this.cant++;            
    //Cuando terminan de realizarse todas las peticiones HTTP 
    //el spinner desaparece    
    if (this.cant == this.max) {
      this.cargando.next(false);  
      const x=this.document.getElementById("loader");
      if(x!=undefined){
        x.style.opacity="0";
        x.style.display="none"
      }
    }        
  }
  getCantidadCargada(){
    return this.cant;
  }
  getMax(){
    return this.max;
  }
  mostrarSpinner(){
    this.cargando.next(true);
  }
  borrarSpinner(){
    this.cargando.next(false);
  }
}
