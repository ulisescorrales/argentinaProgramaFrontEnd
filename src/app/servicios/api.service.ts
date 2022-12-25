import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Mensaje } from '../clases/mensaje';
import { IPersona } from '../clases/persona';
import { IContacto } from '../clases/contacto';
import { IEducacion } from '../clases/IEducacion';
import { ITecnologia } from '../clases/itecnologia';
import { IExperiencia } from '../clases/iexperiencia';
import { ITarea } from '../clases/itarea';
import { IDomicilio } from '../clases/idomicilio';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url="http://localhost:8080"
  constructor(private http:HttpClient) { }
  
  //Mensaje
  public saveMensaje(mensaje:Mensaje){
    return this.http.post(this.url+'/mensaje/crear',mensaje,{'observe':'response'});
  }
  public getTodosMensajes():Observable<Mensaje[]>{
    return this.http.get<Mensaje[]>(this.url+'/mensaje/traer');
  }
  //Persona
  public getPersona(){
    return this.http.get<IPersona>(this.url+'/persona/traer');
  }
  public putPersona(unaPersona:IPersona){
    return this.http.put(this.url+'/persona/editar',unaPersona);
  }
  //Contacto
  public getContacto(){
    return this.http.get<IContacto>(this.url+'/contacto/traer');
  }
  public putContacto(unContacto:IContacto){
    return this.http.put(this.url+'/contacto/editar',unContacto);
  }
  //Domicilio
  public getDomicilio(){
    return this.http.get<IDomicilio>(this.url+'/domicilio/traer')
  }
  public putDomicilio(unDomicilio:IDomicilio){
    return this.http.put(this.url+'/domicilio/editar',unDomicilio);
  }
  //Educación
  public getEducacion(id:number){
    return this.http.get<IEducacion>(this.url+'/educacion/'+id);
  }
  public getAllEducacion(){
    return this.http.get<IEducacion[]>(this.url+'/educacion/traer');
  }
  public putEducacion(id:number,unaEd:IEducacion){
    return this.http.put(this.url+'/educacion/editar/'+id,unaEd);
  }
  public postEducacion(unaEd:IEducacion){
    return this.http.post(this.url+'/educacion/agregar',unaEd);
  }
  //Conocimiento
  public getAllTecnologia(){
    return this.http.get<ITecnologia[]>(this.url+'/tecnologia/traer');
  }
  public getTecnologia(id:number){
    return this.http.get<ITecnologia>(this.url+'/tecnologia/traer/'+id);
  }
  public putTecnologia(id:number,unaTecnologia:ITecnologia){
    return this.http.put(this.url+'/tecnologia/editar/'+id,unaTecnologia)
  }
  public postTecnologia(unaTecnologia:ITecnologia){
    return this.http.post(this.url+'/tecnologia/agregar',unaTecnologia);
  }
  //Experiencia
  public getAllExperiencia(){
    return this.http.get<IExperiencia[]>(this.url+'/experiencia/traer');
  }
  public getExperiencia(id:number){
    return this.http.get<IExperiencia>(this.url+'/experiencia/traer/'+id);
  }
  public putExperiencia(id:number,unaExp:IExperiencia){
    return this.http.put(this.url+'/experiencia/editar/'+id,unaExp)
  }
  public postExperiencia(unaExp:IExperiencia){
    return this.http.put(this.url+'/experiencia/agregar',unaExp);
  }
  //Tarea
  public getTareas(id:number){
    return this.http.get<ITarea[]>(this.url+'/experiencia/'+id+'/tarea/traer')
  }
}
