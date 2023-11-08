import { Component, HostListener, OnInit } from '@angular/core';
import { ITecnologia } from 'src/app/interfaces/itecnologia';
import { ApiService } from 'src/app/servicios/api.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { SpinnerService } from 'src/app/servicios/spinner.service';

@Component({
  selector: 'app-conocimientos',
  templateUrl: './conocimientos.component.html',
  styleUrls: ['./conocimientos.component.css']
})
export class ConocimientosComponent implements OnInit {
  tamanioKnowledge: any;
  filas: any;
  filasArray: any;
  columnas:number=0;
  columnasArray: any;
  editar: boolean = false;
  Math = Math;//Para usar Math.floor() en el HTML
  knowledgeList: any;
  listTecnologia: ITecnologia[] = new Array<ITecnologia>();
  windowWidth = window.innerWidth;
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.definirCantCols();
  }
  constructor(private inicio: SpinnerService, private api: ApiService, private autenticacion: AutenticacionService) { 
    this.definirCantCols();
  }
  ngOnInit(): void {
    this.editar = this.autenticacion.logIn;
    this.api.getAllTecnologia().subscribe({
      next: (data: ITecnologia[]) => {
        var longitud = data.length;

        //Variables usadas para construir la grilla
        this.tamanioKnowledge = longitud;
        this.filas = Math.ceil(this.tamanioKnowledge / this.columnas);
        this.filasArray = Array(this.filas).fill(this.filas);
        this.columnasArray = Array(this.columnas).fill(this.columnas);

        this.listTecnologia = data;
        this.inicio.sumarComponenteCargado();
      }, error: () => {
        this.inicio.sumarComponenteCargado();
      }
    })
  }
  definirCantCols():void{
    this.windowWidth = window.innerWidth;
    if (this.windowWidth < 630) {
      this.columnas = 2;
      this.columnasArray = Array(this.columnas).fill(this.columnas);
    } else {
      this.columnas = 3;
      this.columnasArray = Array(this.columnas).fill(this.columnas);
    }
  }
}
