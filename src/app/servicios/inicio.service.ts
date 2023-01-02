import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InicioService {

  cant=0;
  componentesCargados=new Subject<number>;
  constructor() { 
    this.componentesCargados.next(0);
  }
  getCantComponentesCargados(){
    return this.componentesCargados;
  }

  sumarComponentesCargados(){
    this.cant++;
    this.componentesCargados.next(this.cant);
  }

}
