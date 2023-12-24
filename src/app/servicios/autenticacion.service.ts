import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Url } from './url';
import { MensajeService } from './mensajeService';


@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {  
  url=Url.getUrl()+"/auth/login";
  currentUserSubject: BehaviorSubject<any>;

  constructor(private mensaje:MensajeService,private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser') || '{}'))
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
    return this.currentUserSubject;
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(false);
    this.mensaje.comunicateMensaje("Ha cerrado sesión correctamente");
  }
  login(){
    this.currentUserSubject.next(true);
  }
  public get logIn(): boolean {
    return sessionStorage.getItem('currentUser') != null;
  }

  
}
