import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EncabezadoComponent } from './components/encabezado/encabezado.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { EducacionComponent } from './components/educacion/educacion.component';
import { HabilidadesComponent } from './components/habilidades/habilidades.component';
import { LoginComponent } from './components/login/login.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { ConocimientoFormComponent } from './conocimiento-form/conocimiento-form.component';
import { EditarComponent } from './components/editar/editar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ConocimientoEditComponent } from './components/editar/conocimiento-edit/conocimiento-edit.component';
import { EducacionEditComponent } from './components/editar/educacion-edit/educacion-edit.component';
import { BorrarComponent } from './components/editar/borrar/borrar.component';
import { AgregarEducacionComponent } from './components/editar/agregar/agregar-educacion/agregar-educacion.component';
import { AgregarConocimientoComponent } from './components/editar/agregar/agregar-conocimiento/agregar-conocimiento.component';
import { AgregarExperienciaComponent } from './components/editar/agregar/agregar-experiencia/agregar-experiencia.component';
import { ExperienciaEditComponent } from './components/editar/experiencia-edit/experiencia-edit.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { EditarAcercaDeComponent } from './components/editar/editar-acerca-de/editar-acerca-de.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConocimientosComponent } from './components/conocimientos/conocimientos.component';
import { ApiService } from './servicios/api.service';
import { InterceptorService } from './servicios/interceptor.service';
import { ProyectoComponent } from './components/proyecto/proyecto.component';
import { AgregarProyectoComponent } from './components/editar/agregar/agregar-proyecto/agregar-proyecto.component';
import { ProyectoEditComponent } from './components/editar/proyecto-edit/proyecto-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    AcercaDeComponent,
    ExperienciaComponent,
    EducacionComponent,
    HabilidadesComponent,    
    LoginComponent,    
    FormularioComponent,
    FooterComponent,
    ConocimientoFormComponent,
    EditarComponent,
    ConocimientoEditComponent,
    AgregarEducacionComponent,
    EducacionEditComponent,    
    BorrarComponent, AgregarConocimientoComponent, AgregarConocimientoComponent, AgregarExperienciaComponent, ExperienciaEditComponent, ContactoComponent, EditarAcercaDeComponent, ConocimientosComponent, ProyectoComponent, AgregarProyectoComponent, ProyectoEditComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,//
  ],
  providers: [ApiService,
  {provide: HTTP_INTERCEPTORS, useClass:InterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
