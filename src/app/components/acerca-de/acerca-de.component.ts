import { Component, OnInit } from '@angular/core';
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
  constructor(private datosPortfolio: PortfolioService) { }

  ngOnInit(): void {    
    this.datosPortfolio.obtenerDatos().subscribe(data => {      
      this.nombre=data.name;
      this.editar=data.edit;
      this.descripcion=data.description;
    });
  }

}
