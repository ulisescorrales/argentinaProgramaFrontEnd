import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  //Servicio usado para contabilizar los componentes cargados (con o sin errores) durante el inicio de la página
  //y para la visualización del spinner de carga
  cant:number = 0;  
  x=document.getElementById('status');
  
  constructor() {        
  }

  sumarComponenteCargado() {
    this.cant++;        
    //Cuando terminan de realizarse todas las peticiones HTTP 
    //el spinner desaparece    
    if (this.cant == 7) {
      const x = document.getElementById('status');
      const y=document.getElementById('mensajeDeInicio');
      if (x != null) {
        x.style.display = "none";
        x.style.backgroundColor="none";
        x.style.borderStyle="none";
      }
      if(y!=null){
        y.style.display='none';
      }
    }        
  }

}
