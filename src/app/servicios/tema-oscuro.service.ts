import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemaOscuroService {
  //Clase que comunica a los componentes el tema global elegido (oscuro/claro) para que los componentes reaccionen
  //ante un cambio solicitado
  darkTheme=new BehaviorSubject<boolean>(false);
  constructor() {      
    //Detectar tema predeterminado del navegador    
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.darkTheme.next(true);
    }
    //Reaccionar ante el cambio de tema preferido del navegador
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', ({ matches }) => {
        if (matches) {
          this.darkTheme.next(true);
        } else {
          this.darkTheme.next(false);
        }
      })   
  }

  public switDarkTheme(){
    if(this.darkTheme.value==false){
      this.darkTheme.next(true);
    }else{
      this.darkTheme.next(false);
    }
  }
  public getDarkBoolean(){
    return this.darkTheme.asObservable();
  }
}
