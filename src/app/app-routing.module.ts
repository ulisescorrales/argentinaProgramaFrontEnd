//Módulos para hacer routing
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Se importan los componentes creados
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';
import {EncabezadoComponent} from './components/encabezado/encabezado.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:'inicio', component: EncabezadoComponent},
  {path:'segunda-pagina', component: AcercaDeComponent},
  {path:'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
