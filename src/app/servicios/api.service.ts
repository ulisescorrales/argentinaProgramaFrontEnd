import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Mensaje } from '../clases/mensaje';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  //http://localhost:8080/users
  public saveMensaje(mensaje:Mensaje){
    return this.http.post('http://localhost:8080/mensaje/crear',mensaje)
  }
  public getTodosMensajes():Observable<Mensaje[]>{
    return this.http.get<Mensaje[]>('http://localhost:8080/mensaje/traer')
  }
}
