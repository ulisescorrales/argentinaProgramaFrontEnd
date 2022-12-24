import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Mensaje } from '../clases/mensaje';
import { Persona } from '../clases/persona';
import { Contacto } from '../clases/contacto';
import { IEducacion } from '../clases/IEducacion';
import { ITecnologia } from '../clases/itecnologia';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url="http://localhost:8080"
  constructor(private http:HttpClient) { }
  
  public saveMensaje(mensaje:Mensaje){
    return this.http.post(this.url+'/mensaje/crear',mensaje,{'observe':'response'});
  }
  public getTodosMensajes():Observable<Mensaje[]>{
    return this.http.get<Mensaje[]>(this.url+'/mensaje/traer');
  }
  public getPersona(){
    return this.http.get<Persona>(this.url+'/persona/traer');
  }
  public getContacto(){
    return this.http.get<Contacto>(this.url+'/contacto/traer');
  }

  //Educación
  public getEducacion(id:number){
    return this.http.get<IEducacion>(this.url+'/educacion/'+id);
  }
  public getAllEducacion(){
    return this.http.get<IEducacion[]>(this.url+'/educacion/traer');
  }
  //Tecnología
  public getAllTecnologia(){
    return this.http.get<ITecnologia[]>(this.url+'/tecnologia/traer');
  }
}
