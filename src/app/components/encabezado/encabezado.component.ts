import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {

  miPortfolio:any; //sera el nombre de la etiqueta con la que vas a buscar en el JSON
  fb:any;
  tw:any;
  gh:any;
  lk:any;
  constructor(private datosPortfolio: PortfolioService) { }

  ngOnInit(): void {    
    this.datosPortfolio.obtenerDatos().subscribe(data => {      
      this.miPortfolio=data;
      this.fb=this.miPortfolio.facebook;
      this.tw=this.miPortfolio.twitter;
      this.gh=this.miPortfolio.gitHub;
      this.lk=this.miPortfolio.linkedin;
    });
  }

}
