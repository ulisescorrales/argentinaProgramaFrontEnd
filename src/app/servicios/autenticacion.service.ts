import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Url } from './url';
import { AlertaService } from './mensajeService';


@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {  
  url=Url.getUrl()+"/auth/login";
  currentUserSubject: BehaviorSubject<any>;
  autenticado:BehaviorSubject<boolean>=new BehaviorSubject(false);

  constructor(private alerta:AlertaService,private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser') || '{}'));
    if(this.currentUserSubject.value.token!=null){
      this.autenticado.next(true);      
    }
  }
  IniciarSesion(credenciales: any): Observable<any> {
    return this.http.post(this.url, credenciales).pipe(map(data => {
      sessionStorage.setItem('currentUser', JSON.stringify(data));
      this.currentUserSubject.next(data);
      return data;
    }));
  }

  get UsuarioAutenticado() {
    return this.currentUserSubject.value;
  }
  getUsuarioAutenticado(){
    return this.autenticado;
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    this.autenticado.next(false);
    this.alerta.comunicarMensaje("Ha cerrado sesión correctamente","alert-success");
  }
  login(){
    this.autenticado.next(true);
  }
  public get logIn(): boolean {
    return sessionStorage.getItem('currentUser') != null;
  }

  
}
