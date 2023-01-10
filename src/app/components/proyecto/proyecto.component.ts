import { Component, OnInit } from '@angular/core';
import { IProyecto } from 'src/app/interfaces/iproyecto';
import { ApiService } from 'src/app/servicios/api.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { SpinnerService } from 'src/app/servicios/spinner.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

  tamanioKnowledge: any;
  filas: any;
  filasArray: any;
  columnas = 3;
  columnasArray: any;
  editar: boolean = false;

  Math = Math;//Para usar Math.floor() en el HTML

  knowledgeList: any;
  listProyecto: IProyecto[] = new Array<IProyecto>();
  constructor(private inicio: SpinnerService, private api: ApiService, private autenticacion: AutenticacionService) { }
  ngOnInit(): void {
    this.editar = this.autenticacion.logIn;
    this.api.getAllProyecto().subscribe((data: IProyecto[]) => {
      var longitud = data.length;

      this.tamanioKnowledge = longitud;
      this.filas = Math.ceil(this.tamanioKnowledge / this.columnas);
      this.filasArray = Array(this.filas).fill(this.filas);//Es necesario el fill?
      this.columnasArray = Array(this.columnas).fill(this.columnas);

      this.listProyecto = data;
      this.inicio.sumarComponenteCargado();
    }, error => {
      this.inicio.sumarComponenteCargado();
    });    
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
