import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/clases/persona';
import { ApiService } from 'src/app/servicios/api.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

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
  constructor(private datosPortfolio: PortfolioService, private persona:ApiService) { }

  ngOnInit(): void {    
    this.datosPortfolio.obtenerDatos().subscribe(data => {            
      this.editar=data.edit;      
    });
    this.persona.getPersona().subscribe((data:Persona)=>{      
      console.log(data);
      this.nombre=data.apellido+" "+data.nombre
      this.descripcion=data.sobreMi;
      this.fotoPerfil=data.fotoPerfil;
      this.fotoFondo=data.fotoFondo;
    })
  }

}
