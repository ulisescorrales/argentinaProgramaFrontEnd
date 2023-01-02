import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  form: FormGroup;
  constructor(private formBuilder: FormBuilder, private ruta: Router, private http: HttpClient, private api: ApiService) {
    this.form = this.formBuilder.group({
      contacto: ['', [Validators.required, Validators.email]],
      organizacion: ['', [Validators.required]],
      mensaje: ['', [Validators.required]]
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
        console.log(data);
        if (x != null) {
          if (status == 200) {
            x.innerHTML = "Mensaje enviado";
            x.style.color = "green";
          }
        }
      },
        error => {
          if (x != null) {
            x.innerHTML = "Error en petición HTTP";
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
