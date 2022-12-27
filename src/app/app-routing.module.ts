//Módulos para hacer routing
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
// Se importan los componentes creados
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';
import { ConocimientoEditComponent } from './components/editar/conocimiento-edit/conocimiento-edit.component';
import { EditarComponent } from './components/editar/editar.component';
import { EducacionEditComponent } from './components/editar/educacion-edit/educacion-edit.component';
import { BorrarComponent } from './components/editar/borrar/borrar.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { LoginComponent } from './components/login/login.component';
import { AgregarEducacionComponent } from './components/editar/agregar/agregar-educacion/agregar-educacion.component';
import { AgregarConocimientoComponent } from './components/editar/agregar/agregar-conocimiento/agregar-conocimiento.component';
import { AgregarExperienciaComponent } from './components/editar/agregar/agregar-experiencia/agregar-experiencia.component';
import { ExperienciaEditComponent } from './components/editar/experiencia-edit/experiencia-edit.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { EditarAcercaDeComponent } from './components/editar/editar-acerca-de/editar-acerca-de.component';
import { GuardGuard } from './servicios/guard.guard';

const routes: Routes = [
  //{path:'inicio', component: AppComponent},
  { path: 'segunda-pagina', component: AcercaDeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contacto', component: ContactoComponent },
  {
    path: 'editar', component: EditarComponent, children: [
      { path: 'conocimiento/:id', component: ConocimientoEditComponent },
      { path: 'educacion/:id', component: EducacionEditComponent },
      { path: 'experiencia/:id', component: ExperienciaEditComponent },
      { path: 'acercaDe', component: EditarAcercaDeComponent },
      {
        path: 'eliminar', component: BorrarComponent, children: [
          { path: 'educacion/:id', component: BorrarComponent },
          { path: 'conocimiento/:id', component: ConocimientoEditComponent },//---------------
          { path: 'experiencia/:id', component: BorrarComponent },
          { path: 'acerca-de', component: LoginComponent }
        ]
      }, {
        path: 'agregar', children: [
          { path: 'educacion', component: AgregarEducacionComponent },
          { path: 'conocimiento', component: AgregarConocimientoComponent },
          { path: 'experiencia', component: AgregarExperienciaComponent }
        ]
      }
    ],canActivate:[GuardGuard]
  },
  { path: '', redirectTo: '/', pathMatch: 'full' } //Ruta de inicio
  //{path: '**', component: Pagina404Component}  //Componente Pagina 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
