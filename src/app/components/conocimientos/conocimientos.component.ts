import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }
  
}
