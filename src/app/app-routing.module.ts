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
import { LoginComponent } from './components/login/login.component';
import { AgregarEducacionComponent } from './components/editar/agregar/agregar-educacion/agregar-educacion.component';
import { AgregarConocimientoComponent } from './components/editar/agregar/agregar-conocimiento/agregar-conocimiento.component';
import { AgregarExperienciaComponent } from './components/editar/agregar/agregar-experiencia/agregar-experiencia.component';
import { ExperienciaEditComponent } from './components/editar/experiencia-edit/experiencia-edit.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { EditarAcercaDeComponent } from './components/editar/editar-acerca-de/editar-acerca-de.component';
import { GuardGuard } from './servicios/guard.guard';
import { ProyectoEditComponent } from './components/editar/proyecto-edit/proyecto-edit.component';
import { AgregarProyectoComponent } from './components/editar/agregar/agregar-proyecto/agregar-proyecto.component';
import { MensajesComponent } from './components/mensajes/mensajes.component';

const routes: Routes = [
  //{path:'inicio', component: AppComponent},  
  { path: 'login', component: LoginComponent },
  { path: 'contacto', component: ContactoComponent },
  {
    path: 'editar', component: EditarComponent, children: [
      { path: 'conocimiento/:id', component: ConocimientoEditComponent },
      { path: 'educacion/:id', component: EducacionEditComponent },
      { path: 'experiencia/:id', component: ExperienciaEditComponent },
      { path: 'acercaDe', component: EditarAcercaDeComponent },
      { path: 'proyecto/:id', component: ProyectoEditComponent }
      ,
      {
        path: 'eliminar', component: BorrarComponent, children: [
          { path: 'educacion/:id', component: BorrarComponent },
          { path: 'conocimiento/:id', component: BorrarComponent },//---------------
          { path: 'experiencia/:id', component: BorrarComponent },
          { path: 'acerca-de', component: LoginComponent },
          { path: 'proyecto/:id', component: BorrarComponent }
        ]
      }, {
        path: 'agregar', children: [
          { path: 'educacion', component: AgregarEducacionComponent },
          { path: 'conocimiento', component: AgregarConocimientoComponent },
          { path: 'experiencia', component: AgregarExperienciaComponent },
          {path:'proyecto',component:AgregarProyectoComponent}
        ]
      }
    ], canActivate: [GuardGuard]
  },
  {path:'mensaje',component:EditarComponent,children:[
    { path: 'ver', component: MensajesComponent }
  ]},
  { path: '', redirectTo: '/', pathMatch: 'full' } //Ruta de inicio
  //{path: '**', component: Pagina404Component}  //Componente Pagina 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
