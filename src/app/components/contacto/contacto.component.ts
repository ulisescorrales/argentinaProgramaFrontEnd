import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { SuccessService } from 'src/app/servicios/success.service';
import { TemaOscuroService } from 'src/app/servicios/tema-oscuro.service';


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
  darkTheme=false;
  form: UntypedFormGroup;
  constructor(private tema:TemaOscuroService,private formBuilder: UntypedFormBuilder, private ruta: Router, private http: HttpClient, private api: ApiService,private success:SuccessService) {
    this.form = this.formBuilder.group({
      contacto: ['', [Validators.required, Validators.email]],
      organizacion: ['', [Validators.required]],
      mensaje: ['', [Validators.required]]
    });
    this.tema.getDarkBoolean().subscribe({
      next:(data)=>{
        this.darkTheme=data;
      }
    });
  }

  ngOnInit(): void {
  }
  get Contacto() {
    return this.form.get('contacto')
  }
  get Organizacion() {
    return this.form.get('organizacion')
  }
  get Mensaje() {
    return this.form.get('mensaje')
  }

  enviarMensaje(event: Event): void {
    const x = document.getElementById('estadoMensaje');
    var status;
    if (!this.Mensaje?.errors && !this.Organizacion?.errors && !this.Contacto?.errors) {
      var status;      
      this.api.saveMensaje(this.form.value).subscribe(data => {
        status = data.status;         
        this.success.comunicateSuccess("Mensaje enviado correctamente");
        this.ruta.navigate(["/"]);        
      },
        error => {
          if (x != null) {
            x.innerHTML = "Error, vuelva a intentarlo nuevamente";
            x.style.color = "red";            
          }
        }
      );
    } else {
      if (x != null) {
        x.innerHTML = "Error en mensaje";
        x.style.color = "red";
      }
    }
  }
}
