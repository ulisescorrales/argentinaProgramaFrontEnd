import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionService } from './autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard {
  constructor(private autenticacionServicio: AutenticacionService, private rutas: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let currentUser = this.autenticacionServicio.UsuarioAutenticado;
    if (currentUser != null && currentUser.token != null) {
      return true;
    } else {
      this.rutas.navigate(['/login']);
      return false;
    }
  }

}
