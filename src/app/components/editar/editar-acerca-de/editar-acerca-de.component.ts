import { isExpressionFactoryMetadata } from '@angular/compiler/src/render3/r3_factory';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IContacto } from 'src/app/clases/contacto';
import { IPersona } from 'src/app/clases/persona';
import { IDomicilio } from 'src/app/clases/idomicilio';
import { ApiService } from 'src/app/servicios/api.service';

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
  constructor(private formBuilder: FormBuilder, private api: ApiService) {
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
      this.api.putPersona(this.formPersona.value).subscribe();
    }
  }
  enviarContacto() {
    if (this.formContacto.touched) {
      this.api.putContacto(this.formPersona.value).subscribe();
    }
  }
  enviarDomicilio() {
    if(this.formDomicilio.touched){
      this.api.putDomicilio(this.formDomicilio.value).subscribe;
    }
  }
}
