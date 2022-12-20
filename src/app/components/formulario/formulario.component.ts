import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  private url = 'http://localhost:3306/';
  form: FormGroup;
  constructor(private formBuilder: FormBuilder, private ruta: Router,private http:HttpClient) {
    this.form = this.formBuilder.group({
      organizacion: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],      
      mensaje: ['',[Validators.required]]
    });
  }

  
  ngOnInit(): void {
  }
  get Email(){
    return this.form.get('email')
  }
  get Organizacion(){
    return this.form.get('organizacion')
  }
  get Mensaje(){
    return this.form.get('mensaje')
  }

  enviarMensaje() {
    alert("intentando enviar");
    //console.log(this.form.value);
    //console.log(this.http.post('http://localhost:3306/mensaje/crear',this.form.value));
  }
}
