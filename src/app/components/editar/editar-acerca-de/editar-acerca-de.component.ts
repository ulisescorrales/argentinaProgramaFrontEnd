import { isExpressionFactoryMetadata } from '@angular/compiler/src/render3/r3_factory';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IContacto } from 'src/app/clases/contacto';
import { IPersona } from 'src/app/clases/persona';
import { IDomicilio } from 'src/app/clases/idomicilio';
import { ApiService } from 'src/app/servicios/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-acerca-de',
  templateUrl: './editar-acerca-de.component.html',
  styleUrls: ['./editar-acerca-de.component.css']
})
export class EditarAcercaDeComponent implements OnInit {

  persona: IPersona | undefined;
  contacto: IContacto | undefined;
  formPersona: FormGroup;
  formContacto: FormGroup;
  formDomicilio: FormGroup;
  constructor(private router:Router,private formBuilder: FormBuilder, private api: ApiService) {
    this.formPersona = this.formBuilder.group({
      sobreMi: [''],
      fotoPerfil: ['', [Validators.required]],
      fotoFondo: ['', [Validators.required]],
    });
    this.formContacto = this.formBuilder.group({
      email: [''],
      telefono: [''],
      linkedin: [''],
      twitter: [''],
      facebook: [''],
      github: [''],
    });
    this.formDomicilio = this.formBuilder.group({
      pais: [],
      provincia: [],
      ciudad: [],
      calle: [],
      numero: [],
      codigoPostal: [],
    })
  }

  ngOnInit(): void {
    this.api.getPersona().subscribe((data: IPersona) => {
      this.formPersona.setValue({
        sobreMi: data.sobreMi,
        fotoPerfil: data.fotoPerfil,
        fotoFondo: data.fotoFondo
      })
    })
    this.api.getContacto().subscribe((data: IContacto) => {
      this.formContacto.setValue({
        email: data.email,
        telefono: data.telefono,
        linkedin: data.linkedin,
        twitter: data.twitter,
        facebook: data.facebook,
        github: data.github,
      })
    })
    this.api.getDomicilio().subscribe((data: IDomicilio) => {
      this.formDomicilio.setValue({
        pais: data.pais,
        provincia: data.provincia,
        ciudad: data.ciudad,
        calle: data.calle,
        numero: data.numero,
        codigoPostal: data.codigoPostal
      })
    })
  }
  enviarAcercaDe() {
    if (this.formPersona.touched) {
      const x=document.getElementById('estadoEnvio');
      this.api.putPersona(this.formPersona.value).subscribe(data => {
        if (x != null) {
          x.style.color = "green";
          x.innerHTML = "Solicitud enviada correctamente"
          this.api.actualizarPersona();
        }
      },
        error => {
          if (error.status = 401) {
            alert("Error: debe volver a iniciar sesión");
            this.router.navigate(['/login']);
            window.location.reload();
          } else {
            if (x != null) {
              x.style.color = "red";
              x.innerHTML = "Error en solicitud HTTP en datos personales"
            }
          }
        });
      
    }
  }
  enviarContacto() {
    if (this.formContacto.touched) {
      const x=document.getElementById('estadoEnvio');
      this.api.putContacto(this.formContacto.value).subscribe(data => {
        if (x != null) {
          x.style.color = "green";
          x.innerHTML = "Solicitud enviada correctamente"
        }
      },
        error => {
          if (error.status = 401) {
            alert("Error: debe volver a iniciar sesión");
            this.router.navigate(['/login']);
            window.location.reload();
          } else {
            if (x != null) {
              x.style.color = "red";
              x.innerHTML = "Error en solicitud HTTP en campos de links"
            }
          }
        });
    }
  }
  enviarDomicilio() {
    if(this.formDomicilio.touched){
      const x=document.getElementById('estadoEnvio');
      this.api.putDomicilio(this.formDomicilio.value).subscribe(data => {
        if (x != null) {
          x.style.color = "green";
          x.innerHTML = "Solicitud enviada correctamente"
        }
      },
        error => {
          if (error.status = 401) {
            alert("Error: debe volver a iniciar sesión");
            this.router.navigate(['/login']);
            window.location.reload();
          } else {
            if (x != null) {
              x.style.color = "red";
              x.innerHTML = "Error en solicitud HTTP en datos de domicilio"
            }
          }
        });
    }
  }
}
