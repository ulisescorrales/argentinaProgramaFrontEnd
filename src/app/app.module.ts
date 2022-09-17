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
import { FooterComponent } from './footer/footer.component';
import { ConocimientoFormComponent } from './conocimiento-form/conocimiento-form.component';


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
