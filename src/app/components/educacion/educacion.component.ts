import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';



@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']  
})
export class EducacionComponent implements OnInit {    

  tamanioKnowledge:any;
  filas:any;
  filasArray:any;
  columnas=3;
  columnasArray:any

  Math = Math;//Para usar Math.floor() en el HTML

  estudiosList:any; //sera el nombre de la etiqueta con la que vas a buscar en el JSON
  knowledgeList:any;
  constructor(private datosPortfolio: PortfolioService) { }

  ngOnInit(): void {    
    this.datosPortfolio.obtenerDatos().subscribe(data => {      
      this.estudiosList=data.studies;     
      this.knowledgeList=data.knowledge;//
      this.tamanioKnowledge=this.knowledgeList.length;//Conseguir la longitud de la lista

      this.filas=Math.ceil(this.tamanioKnowledge/3);

      this.filasArray=Array(this.filas).fill(this.filas);//Es necesario el fill?
      this.columnasArray=Array(this.columnas).fill(this.columnas);
    });
  }

}
