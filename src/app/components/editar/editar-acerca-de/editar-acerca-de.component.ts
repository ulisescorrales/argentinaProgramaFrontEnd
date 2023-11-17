
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { IContacto } from 'src/app/interfaces/contacto';
import { IPersona } from 'src/app/interfaces/persona';
import { IDomicilio } from 'src/app/interfaces/idomicilio';
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
  formPersona: UntypedFormGroup;
  formContacto: UntypedFormGroup;
  formDomicilio: UntypedFormGroup;
  x = document.getElementById('status');
  i = 0;
  constructor(private router: Router, private formBuilder: UntypedFormBuilder, private api: ApiService) {
    this.formPersona = this.formBuilder.group({
      sobreMi: [''],
      fotoPerfil: ['', [Validators.required]],
      fotoFondo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]]
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
    this.mostrarSpinner();
    this.cargarPersona();
    this.cargarContacto();
    this.cargarDomicilio();

  }
  enviarPersona() {
    if (this.formPersona.touched) {
      this.mostrarSpinner();
      const x = document.getElementById('estadoEnvio');
      this.api.putPersona(this.formPersona.value).subscribe(data => {
        this.borrarSpinner();
        if (x != null) {
          x.style.color = "green";
          x.innerHTML = "Solicitud enviada correctamente"
          this.api.actualizarPersona();
        }
      },
        error => {
          this.notificarTokenVencido(error, x);
        },
        () => {
          this.borrarSpinner();
        });

    }
  }
  enviarContacto() {
    if (this.formContacto.touched) {
      this.mostrarSpinner();
      const x = document.getElementById('estadoEnvio');
      this.api.putContacto(this.formContacto.value).subscribe(data => {
        this.borrarSpinner();
        if (x != null) {
          x.style.color = "green";
          x.innerHTML = "Solicitud enviada correctamente"
        }
      },
        error => {
          this.notificarTokenVencido(error, x);
        }, () => {
          this.borrarSpinner();
        });
    }
  }
  enviarDomicilio() {
    if (this.formDomicilio.touched) {
      this.mostrarSpinner();
      const x = document.getElementById('estadoEnvio');
      this.api.putDomicilio(this.formDomicilio.value).subscribe(data => {
        this.borrarSpinner();
        if (x != null) {
          x.style.color = "green";
          x.innerHTML = "Solicitud enviada correctamente"
        }
      },
        error => {
          this.notificarTokenVencido(error, x);
        },
        () => {
          this.borrarSpinner();
        });
    }
  }
  //-----------------------
  notificarTokenVencido(error: any, x: any) {
    if (error.status = 401) {
      alert("Error: debe volver a iniciar sesión");
      this.router.navigate(['/login']).then(value => {
        window.location.reload();
      });
    } else {
      if (x != null) {
        x.style.color = "red";
        x.innerHTML = "Error en solicitud HTTP en datos de domicilio"
      }
    }
  }
  //-----------------------------------------
  cargarPersona() {
    this.api.getPersona().subscribe((data: IPersona) => {
      this.i++;
      if (this.i == 3) {
        this.borrarSpinner();
      }
      this.formPersona.setValue({
        sobreMi: data.sobreMi,
        fotoPerfil: data.fotoPerfil,
        fotoFondo: data.fotoFondo,
        nombre:data.nombre,
        apellido:data.apellido
      })
    },
      error => {
        alert("Error al cargar el elemento");
        this.router.navigate(['/'])
      })
  }
  cargarContacto() {
    this.api.getContacto().subscribe((data: IContacto) => {
      this.i++;
      if (this.i == 3) {
        this.borrarSpinner();
      }
      this.formContacto.setValue({
        email: data.email,
        telefono: data.telefono,
        linkedin: data.linkedin,
        twitter: data.twitter,
        facebook: data.facebook,
        github: data.github,
      })
    },
      error => {
        alert("Error al cargar el elemento");
        this.router.navigate(['/'])
      })
  }
  cargarDomicilio() {
    this.api.getDomicilio().subscribe((data: IDomicilio) => {
      this.i++;
      if (this.i == 3) {
        this.borrarSpinner();
      }
      this.formDomicilio.setValue({
        pais: data.pais,
        provincia: data.provincia,
        ciudad: data.ciudad,
        calle: data.calle,
        numero: data.numero,
        codigoPostal: data.codigoPostal
      })
    },
      error => {
        alert("Error al cargar el elemento");
        this.router.navigate(['/'])
      })
  }
  borrarSpinner() {
    if (this.x != null) {
      this.x.style.display = "none";
    }
  }
  mostrarSpinner() {
    if (this.x != null) {
      this.x.style.display = "block";//Mostrar spinner cargando
    }
  }
}
