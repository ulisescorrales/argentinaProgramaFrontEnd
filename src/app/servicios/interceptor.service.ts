import { Injectable } from '@angular/core';
import { HttpEvent,HttpHandler,HttpInterceptor,HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutenticacionService } from './autenticacion.service';
import { JSDocTagName } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(private autenticacionService:AutenticacionService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var currentUser=this.autenticacionService.UsuarioAutenticado;
    if(currentUser && currentUser.token){
      req=req.clone({
        setHeaders:{
          Authorization: 'Bearer ${currentUser.token}'
        }
      })
      console.log(req);
    }    
    return next.handle(req);
  }
}
