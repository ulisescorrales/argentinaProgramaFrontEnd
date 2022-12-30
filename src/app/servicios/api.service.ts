import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
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
  url="http://localhost:8080";    
  listEducacion=new Subject<IEducacion[]>();
  persona=new Subject<IPersona>();
  listExperiencia=new Subject<IExperiencia[]>();
  contacto=new Subject<IContacto>();
  domicilio=new Subject<IDomicilio>();
  listConocimiento=new Subject<ITecnologia[]>();

  constructor(private http:HttpClient) { }    
  //Actualizar valores
  actualizarListEducacion(){ 
    console.log("Actualizando educacion");
    this.getAllEducacion().subscribe()
  }
  actualizarPersona(){
    this.getPersona().subscribe();
  }
  actualizarDomicilio(){
    this.getDomicilio().subscribe();
  }
  actualizarContacto(){
    this.getContacto().subscribe()
  }
  actualizarListConocimiento(){
    this.getAllTecnologia().subscribe()
  }
  actualizarListExperiencia(){
    this.getAllExperiencia().subscribe((data:IExperiencia[])=>{
      this.listExperiencia.next(data);
    })
  }

  //Mensaje
  public saveMensaje(mensaje:Mensaje){
    return this.http.post(this.url+'/mensaje/crear',mensaje,{'observe':'response'});
  }
  public getTodosMensajes():Observable<Mensaje[]>{
    return this.http.get<Mensaje[]>(this.url+'/mensaje/traer');
  }
  //Persona
  public getPersona(){
    this.http.get<IPersona>(this.url+'/persona/traer').subscribe((data:IPersona)=>{
      this.persona.next(data);
    })
    return this.persona;
  }
  public putPersona(unaPersona:IPersona){
    return this.http.put(this.url+'/persona/editar',unaPersona,{'observe':'response'});
  }
  //Contacto
  public getContacto(){
    this.http.get<IContacto>(this.url+'/contacto/traer').subscribe((data:IContacto)=>{
      this.contacto.next(data);
    })
    return this.contacto;
  }
  public putContacto(unContacto:IContacto){
    return this.http.put(this.url+'/contacto/editar',unContacto,{'observe':'response'});
  }
  //Domicilio
  public getDomicilio(){
    this.http.get<IDomicilio>(this.url+'/domicilio/traer').subscribe((data:IDomicilio)=>{
      this.domicilio.next(data);
    })
    return this.domicilio;
  }
  public putDomicilio(unDomicilio:IDomicilio){
    return this.http.put(this.url+'/domicilio/editar',unDomicilio,{'observe':'response'});
  }
  //Educación
  public getEducacion(id:number){
    return this.http.get<IEducacion>(this.url+'/educacion/'+id);
  }
  public getAllEducacion(){
    this.http.get<IEducacion[]>(this.url+'/educacion/traer').subscribe((data:IEducacion[])=>{
      this.listEducacion.next(data);
    });
    return this.listEducacion;
  }
  public putEducacion(id:number,unaEd:IEducacion){
    return this.http.put(this.url+'/educacion/editar/'+id,unaEd,{'observe':'response'});
  }
  public postEducacion(unaEd:IEducacion){
    return this.http.post(this.url+'/educacion/agregar',unaEd,{'observe':'response'});
  }

  //Conocimiento (Tecnología
  public getAllTecnologia(){
    this.http.get<ITecnologia[]>(this.url+'/tecnologia/traer').subscribe((data:ITecnologia[])=>{
      this.listConocimiento.next(data);
    })
    return this.listConocimiento;
  }
  public getTecnologia(id:number){
    return this.http.get<ITecnologia>(this.url+'/tecnologia/traer/'+id);
  }
  public putTecnologia(id:number,unaTecnologia:ITecnologia){
    return this.http.put(this.url+'/tecnologia/editar/'+id,unaTecnologia,{'observe':'response'})
  }
  public postTecnologia(unaTecnologia:ITecnologia){    
    return this.http.post(this.url+'/tecnologia/agregar',unaTecnologia,{'observe':'response'});
  }  
  //Experiencia
  public getAllExperiencia(){
    this.http.get<IExperiencia[]>(this.url+'/experiencia/traer').subscribe((data:IExperiencia[])=>{
      this.listExperiencia.next(data);
    })
    return this.listExperiencia;
  }
  public getExperiencia(id:number){
    return this.http.get<IExperiencia>(this.url+'/experiencia/traer/'+id);
  }
  public putExperiencia(id:number,unaExp:IExperiencia){
    return this.http.put(this.url+'/experiencia/editar/'+id,unaExp,{'observe':'response'})
  }
  public postExperiencia(unaExp:IExperiencia){
    console.log(unaExp);
    return this.http.post(this.url+'/experiencia/agregar',unaExp,{'observe':'response'});
  }

  //Tarea
  public getTareas(id:number){
    return this.http.get<ITarea[]>(this.url+'/experiencia/'+id+'/tarea/traer')
  }
  //Método Delete
  public delete(url:string){    
    return this.http.delete(this.url+url,{'observe':'response'});
  }
}
