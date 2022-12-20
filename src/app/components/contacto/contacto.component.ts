import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConditionalExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Mensaje } from 'src/app/clases/mensaje';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token',
      'access-control-allow-origin': '*'
    })
  };
  enviar = { 'organizacion': 'ad', 'contacto': 'sdfs', 'mensaje': 'sdf' };
  form: FormGroup;
  constructor(private formBuilder: FormBuilder, private ruta: Router, private http: HttpClient, private api: ApiService) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      organizacion: ['', [Validators.required]],
      mensaje: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }
  get Email() {
    return this.form.get('email')
  }
  get Organizacion() {
    return this.form.get('organizacion')
  }
  get Mensaje() {
    return this.form.get('mensaje')
  }

  enviarMensaje(event: Event): void {    
    //this.api.getTodosMensajes().subscribe(data => {
    //console.log(data);
    //});
    const mensaje = new Mensaje(50, "Hola", "Cont", "El mensaje");
    this.api.saveMensaje(mensaje).subscribe();
  }
}
