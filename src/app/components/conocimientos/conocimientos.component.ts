import { Component, OnInit } from '@angular/core';
import { ITecnologia } from 'src/app/clases/itecnologia';
import { ApiService } from 'src/app/servicios/api.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-conocimientos',
  templateUrl: './conocimientos.component.html',
  styleUrls: ['./conocimientos.component.css']
})
export class ConocimientosComponent implements OnInit {
  tamanioKnowledge: any;
  filas: any;
  filasArray: any;
  columnas = 3;
  columnasArray: any;
  editar: boolean = false;

  Math = Math;//Para usar Math.floor() en el HTML

  knowledgeList: any;
  listTecnologia: ITecnologia[] = new Array<ITecnologia>();
  constructor(private datosPortfolio: PortfolioService, private api: ApiService) { }
  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data => {
      this.editar = data.edit;
    });
    this.api.getAllTecnologia().subscribe((data: ITecnologia[]) => {
      var longitud = data.length;
      var tec: ITecnologia;
      var item: ITecnologia;

      this.tamanioKnowledge = longitud;
      this.filas = Math.ceil(this.tamanioKnowledge / this.columnas);
      this.filasArray = Array(this.filas).fill(this.filas);//Es necesario el fill?
      this.columnasArray = Array(this.columnas).fill(this.columnas);

      for (var i = 0; i < longitud; i++) {
        item = data[i];
        tec = {
          idTecnologia: (data as any).idTecnologia,
          descripcion: (data as any).descripcion,
          logo: (data as any).logo
        }
        this.listTecnologia.push(item);
      }      
    })
  }
  //Conocimiento

  cambiarTamanio(): void {
    if (window.innerWidth < 800) {
      this.columnas = 2;
    } else {
      this.columnas = 3;
    }
  }  
}
