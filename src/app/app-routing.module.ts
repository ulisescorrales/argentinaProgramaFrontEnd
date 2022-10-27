//Módulos para hacer routing
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
// Se importan los componentes creados
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';
import { ConocimientoEditComponent } from './components/editar/conocimiento-edit/conocimiento-edit.component';
import { EditarComponent } from './components/editar/editar.component';
import { EducacionEditComponent } from './components/editar/educacion-edit/educacion-edit.component';
import { EducacionComponent } from './components/educacion/educacion.component';
import { EliminarComponent } from './components/eliminar/eliminar.component';
import { EncabezadoComponent } from './components/encabezado/encabezado.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  //{path:'inicio', component: AppComponent},
  { path: 'segunda-pagina', component: AcercaDeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'editar', component: EditarComponent, children: [
      { path: 'conocimiento', component: ConocimientoEditComponent },
      { path: 'educacion', component: EducacionEditComponent },
      { path: 'experiencia', component: LoginComponent },
      { path: 'acerca-de', component: LoginComponent }
    ]
  },
  {
    path: 'editar', component: EditarComponent, children: [{
      path: 'eliminar', component: EliminarComponent, children: [
        { path: 'conocimiento', component: ConocimientoEditComponent },
        { path: 'educacion', component: EducacionEditComponent },
        { path: 'experiencia', component: LoginComponent },
        { path: 'acerca-de', component: LoginComponent }
      ]
    }]
  }
  ,
  { path: '', redirectTo: '/', pathMatch: 'full' }, //Ruta de inicio
  //{path: '**', component: Pagina404Component}  //Componente Pagina 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
