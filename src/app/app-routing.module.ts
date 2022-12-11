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
import { EncabezadoComponent } from './components/encabezado/encabezado.component';
import { BorrarComponent } from './components/editar/borrar/borrar.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { LoginComponent } from './components/login/login.component';
import { ActivatedRoute, Params } from '@angular/router';

const routes: Routes = [
  //{path:'inicio', component: AppComponent},
  { path: 'segunda-pagina', component: AcercaDeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contacto', component: FormularioComponent },
  {
    path: 'editar', component: EditarComponent, children: [
      { path: 'conocimiento/:id', component: ConocimientoEditComponent },
      { path: 'educacion/:id', component: EducacionEditComponent },
      { path: 'experiencia/:id', component: LoginComponent },
      { path: 'acerca-de', component: LoginComponent },
      {
        path: 'eliminar', component: BorrarComponent, children: [
          { path: 'educacion/:id', component: BorrarComponent },
          { path: 'conocimiento/:id', component: ConocimientoEditComponent },//---------------
          { path: 'experiencia/:id', component: BorrarComponent },
          { path: 'acerca-de', component: LoginComponent }
        ]
      }, {
        path: 'agregar', children: [
          { path: 'educacion', component: EducacionEditComponent },
          { path: 'conocimiento', component: ConocimientoEditComponent },
          { path: 'experiencia', component: LoginComponent }
        ]
      }
    ]
  },
  { path: '', redirectTo: '/', pathMatch: 'full' } //Ruta de inicio
  //{path: '**', component: Pagina404Component}  //Componente Pagina 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
