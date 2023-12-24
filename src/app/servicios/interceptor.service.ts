import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AutenticacionService } from './autenticacion.service';
import { Router } from '@angular/router';
import {AlertaService } from './mensajeService';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private autenticacionService: AutenticacionService,private router:Router,private alerta:AlertaService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var currentUser = this.autenticacionService.UsuarioAutenticado;
    if (currentUser && currentUser.token) {
      var token = currentUser.token;
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      })
    }
    return next.handle(req).pipe(
      tap(event => {},
      (err:any)=>{
        if(err.status==401){
          this.autenticacionService.logout();
          this.router.navigate(['login']);
          this.alerta.comunicarMensaje("Token expirado, vuelva a autenticarse","alert-danger");
        }
      }),    
      );
  }
}
