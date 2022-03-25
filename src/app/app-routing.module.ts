import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';
import {EncabezadoComponent} from './components/encabezado/encabezado.component';

const routes: Routes = [
  {path:'inicio', component: EncabezadoComponent},
  {path:'segunda-pagina', component: AcercaDeComponent}
 // {path: '**', component: pagina404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
