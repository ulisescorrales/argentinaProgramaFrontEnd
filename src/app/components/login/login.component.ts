import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { TemaOscuroService } from 'src/app/servicios/tema-oscuro.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  darkTheme=false;
  form: UntypedFormGroup;
  constructor(private tema:TemaOscuroService,private formBuilder: UntypedFormBuilder, private autenticationService: AutenticacionService, private ruta: Router) {
    this.form = this.formBuilder.group({
      nombreUsuario: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    tema.getDarkBoolean().subscribe({
      next:(data)=>{
        this.darkTheme=data;
      }
    });
  }

  ngOnInit(): void {
    this.autenticationService.logout;
  }

  get Email() {
    return this.form.get('nombreUsuario');
  }
  get Password() {
    return this.form.get('password')
  }

  onEnviar(event: Event) {
    event.preventDefault;//Prevenir evento del formulario
    const x = document.getElementById('estadoLogin');
    if (x != null) {
      x.style.color = "green";
      x.innerHTML = "Autenticando...";
    }
    this.autenticationService.IniciarSesion(this.form.value).subscribe(data => {      
      this.ruta.navigate(['/']).then(value => { window.location.reload() });
    },
      error => {        
        if (x != null) {          
          x.style.color = "red";          
          if(error.status==401){            
            x.innerHTML = "Usuario o contraseña incorrectos";
          }else{
            x.innerHTML = "Error de autenticación";
          }          
        }
      })
  }
}
