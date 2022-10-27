import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EncabezadoComponent } from './components/encabezado/encabezado.component';
import { HttpClientModule } from '@angular/common/http';
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { EducacionComponent } from './components/educacion/educacion.component';
import { HabilidadesComponent } from './components/habilidades/habilidades.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { LoginComponent } from './components/login/login.component';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { ConocimientoFormComponent } from './conocimiento-form/conocimiento-form.component';
import { EditarComponent } from './components/editar/editar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ConocimientoEditComponent } from './components/editar/conocimiento-edit/conocimiento-edit.component';
import { EducacionEditComponent } from './components/editar/educacion-edit/educacion-edit.component';
import { EliminarComponent } from './components/eliminar/eliminar.component';


@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    AcercaDeComponent,
    ExperienciaComponent,
    EducacionComponent,
    HabilidadesComponent,
    ProyectosComponent,
    LoginComponent,
    LoginButtonComponent,
    FormularioComponent,
    FooterComponent,
    ConocimientoFormComponent,
    EditarComponent,
    ConocimientoEditComponent,
    EducacionEditComponent,
    EliminarComponent    
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
