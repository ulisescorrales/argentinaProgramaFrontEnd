import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  private url='http://localhost:3306/'
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  enviarMensaje(event:Event):void{
    //this.http.post(`${this.url}`+'mensaje/crear',h);
  }
}
