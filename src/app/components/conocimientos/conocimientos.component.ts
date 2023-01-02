import { Component, OnInit } from '@angular/core';
import { ITecnologia } from 'src/app/interfaces/itecnologia';
import { ApiService } from 'src/app/servicios/api.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { InicioService } from 'src/app/servicios/inicio.service';

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
  constructor(private inicio:InicioService,private api: ApiService,private autenticacion:AutenticacionService) { }
  ngOnInit(): void {
    this.editar=this.autenticacion.logIn;
    this.api.getAllTecnologia().subscribe((data: ITecnologia[]) => {
      var longitud = data.length;      

      //Variables usadas para construir la grilla
      this.tamanioKnowledge = longitud;
      this.filas = Math.ceil(this.tamanioKnowledge / this.columnas);
      this.filasArray = Array(this.filas).fill(this.filas);
      this.columnasArray = Array(this.columnas).fill(this.columnas);

      this.listTecnologia=data;    
      this.inicio.sumarComponenteCargado();
    }, error => {
      this.inicio.sumarComponenteCargado();
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
