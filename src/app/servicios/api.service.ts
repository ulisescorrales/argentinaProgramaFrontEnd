import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IMensaje } from '../interfaces/mensaje';
import { IPersona } from '../interfaces/persona';
import { IContacto } from '../interfaces/contacto';
import { IEducacion } from '../interfaces/IEducacion';
import { ITecnologia } from '../interfaces/itecnologia';
import { IExperiencia } from '../interfaces/iexperiencia';
import { ITarea } from '../interfaces/itarea';
import { IDomicilio } from '../interfaces/idomicilio';
import { IProyecto } from '../interfaces/iproyecto';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //Setear modo de prueba - en producción
  // static url = "https://ulisescorrales-porfolio.onrender.com";
  static url="http://localhost:8080"
  //-------
  listEducacion = new Subject<IEducacion[]>();
  persona = new Subject<IPersona>();
  listExperiencia = new Subject<IExperiencia[]>();
  contacto = new Subject<IContacto>();
  domicilio = new Subject<IDomicilio>();
  listConocimiento = new Subject<ITecnologia[]>();
  listProyecto = new Subject<IProyecto[]>();

  constructor(private http: HttpClient) { }
  //Actualizar valores
  actualizarListEducacion() {
    this.getAllEducacion().subscribe()
  }
  actualizarPersona() {
    this.getPersona().subscribe();
  }
  actualizarDomicilio() {
    this.getDomicilio().subscribe();
  }
  actualizarContacto() {
    this.getContacto().subscribe()
  }
  actualizarListConocimiento() {
    this.getAllTecnologia().subscribe()
  }
  actualizarListExperiencia() {
    this.getAllExperiencia().subscribe();
  }
  actualizarListProyecto(){
    this.getAllProyecto().subscribe();
  }

  //Mensaje
  public saveMensaje(mensaje: IMensaje) {
    return this.http.post(ApiService.url + '/mensaje/crear', mensaje, { 'observe': 'response' });
  }
  public getAllMensajes(): Observable<IMensaje[]> {
    return this.http.get<IMensaje[]>(ApiService.url + '/mensaje/traer');
  }
  //Persona
  public getPersona() {
    this.http.get<IPersona>(ApiService.url + '/persona/traer').subscribe((data: IPersona) => {
      this.persona.next(data);
    })
    return this.persona;
  }
  public putPersona(unaPersona: IPersona) {
    return this.http.put(ApiService.url + '/persona/editar', unaPersona, { 'observe': 'response' });
  }
  //Contacto
  public getContacto() {
    this.http.get<IContacto>(ApiService.url + '/contacto/traer').subscribe((data: IContacto) => {
      this.contacto.next(data);
    })
    return this.contacto;
  }
  public putContacto(unContacto: IContacto) {
    return this.http.put(ApiService.url + '/contacto/editar', unContacto, { 'observe': 'response' });
  }
  //Domicilio
  public getDomicilio() {
    this.http.get<IDomicilio>(ApiService.url + '/domicilio/traer').subscribe((data: IDomicilio) => {
      this.domicilio.next(data);
    })
    return this.domicilio;
  }
  public putDomicilio(unDomicilio: IDomicilio) {
    return this.http.put(ApiService.url + '/domicilio/editar', unDomicilio, { 'observe': 'response' });
  }
  //Educación
  public getEducacion(id: number) {
    return this.http.get<IEducacion>(ApiService.url + '/educacion/' + id);
  }
  public getAllEducacion() {
    this.http.get<IEducacion[]>(ApiService.url + '/educacion/traer').subscribe((data: IEducacion[]) => {
      this.listEducacion.next(data);
    });
    return this.listEducacion;
  }
  public putEducacion(id: number, unaEd: IEducacion) {
    return this.http.put(ApiService.url + '/educacion/editar/' + id, unaEd, { 'observe': 'response' });
  }
  public postEducacion(unaEd: IEducacion) {
    return this.http.post(ApiService.url + '/educacion/agregar', unaEd, { 'observe': 'response' });
  }

  //Conocimiento (Tecnología
  public getAllTecnologia() {
    this.http.get<ITecnologia[]>(ApiService.url + '/tecnologia/traer').subscribe((data: ITecnologia[]) => {
      this.listConocimiento.next(data);
    })
    return this.listConocimiento;
  }
  public getTecnologia(id: number) {
    return this.http.get<ITecnologia>(ApiService.url + '/tecnologia/traer/' + id);
  }
  public putTecnologia(id: number, unaTecnologia: ITecnologia) {
    return this.http.put(ApiService.url + '/tecnologia/editar/' + id, unaTecnologia, { 'observe': 'response' })
  }
  public postTecnologia(unaTecnologia: ITecnologia) {
    return this.http.post(ApiService.url + '/tecnologia/agregar', unaTecnologia, { 'observe': 'response' });
  }
  //Experiencia
  public getAllExperiencia() {
    this.http.get<IExperiencia[]>(ApiService.url + '/experiencia/traer').subscribe((data: IExperiencia[]) => {
      this.listExperiencia.next(data);
    })
    return this.listExperiencia;
  }
  public getExperiencia(id: number) {
    return this.http.get<IExperiencia>(ApiService.url + '/experiencia/traer/' + id);
  }
  public putExperiencia(id: number, unaExp: IExperiencia) {
    return this.http.put(ApiService.url + '/experiencia/editar/' + id, unaExp, { 'observe': 'response' })
  }
  public postExperiencia(unaExp: IExperiencia) {
    console.log(unaExp);
    return this.http.post(ApiService.url + '/experiencia/agregar', unaExp, { 'observe': 'response' });
  }

  //Tarea
  public getTareas(id: number) {
    return this.http.get<ITarea[]>(ApiService.url + '/experiencia/' + id + '/tarea/traer')
  }
  //Método Delete (genérico)
  public delete(url: string) {
    return this.http.delete(ApiService.url + url, { 'observe': 'response' });
  }
  //Proyecto
  public getAllProyecto() {
    this.http.get<IProyecto[]>(ApiService.url + '/proyecto/traer').subscribe((data: IProyecto[]) => {
      this.listProyecto.next(data);
    });
    return this.listProyecto;
  }
  public getProyecto(id:number){
    return this.http.get<IProyecto>(ApiService.url+'/proyecto/traer/'+id);
  }
  public putProyecto(id:number,unProyecto:IProyecto){
    return this.http.put(ApiService.url+'/proyecto/editar/'+id,unProyecto,{ 'observe': 'response' });
  }
  public postProyecto(unProyecto:IProyecto){
    return this.http.post(ApiService.url+'/proyecto/agregar',unProyecto,{ 'observe': 'response' });
  }
}
