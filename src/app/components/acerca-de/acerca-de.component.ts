import { Component, OnInit } from '@angular/core';
import { IPersona } from 'src/app/clases/persona';
import { ApiService } from 'src/app/servicios/api.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {

  nombre:any;
  editar:any;
  descripcion:any;
  fotoPerfil:any;
  fotoFondo:any;
  constructor(private persona:ApiService,private autenticacion:AutenticacionService) { }

  ngOnInit(): void {    
    this.editar=this.autenticacion.logIn;    
    this.persona.getPersona().subscribe((data:IPersona)=>{            
      this.nombre=data.apellido+" "+data.nombre
      this.descripcion=data.sobreMi;
      this.fotoPerfil=data.fotoPerfil;
      this.fotoFondo=data.fotoFondo;
    })
  }

}
