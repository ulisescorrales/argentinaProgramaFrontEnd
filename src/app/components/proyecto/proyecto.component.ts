import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { IProyecto } from 'src/app/interfaces/iproyecto';
import { ApiService } from 'src/app/servicios/api.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { SpinnerService } from 'src/app/servicios/spinner.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit,OnChanges {
  @Input() darkTheme:boolean=false;   
  @ViewChild('proyecto') proyectoContainer:ElementRef| undefined; 
  tamanioProyectos: any;
  filas: any;
  //Usado para iterar con ngFor*
  filasArray: any;
  columnas = 3;
  //Usado para iterar con ngFor*
  columnasArray: any;
  editar: boolean = false;  
  Math = Math;//Para usar Math.floor() en el HTML
  //
  cont=0;

  knowledgeList: any;
  listProyecto: IProyecto[] = new Array<IProyecto>();
  constructor(private inicio: SpinnerService, private api: ApiService, private autenticacion: AutenticacionService, private elem: ElementRef){ }   
  ngOnChanges(changes: SimpleChanges): void {        
    if(this.darkTheme==true){      
    }else{

    }
  }
  ngOnInit(): void {        
    this.editar = this.autenticacion.logIn;
    this.api.getAllProyecto().subscribe((data: IProyecto[]) => {      
      var longitud = data.length;

      this.tamanioProyectos = longitud;
      this.filas = Math.ceil(this.tamanioProyectos / this.columnas);
      this.filasArray = Array(this.filas).fill(this.filas);//
      this.columnasArray = Array(this.columnas).fill(this.columnas);      
      this.listProyecto = data;
      this.inicio.sumarComponenteCargado();      
    }, error => {
      this.inicio.sumarComponenteCargado();
    });        
  }


  cambiarTamanioColumnas(): void {
    console.log("cambiando tamanio");
    if (window.innerWidth < 800) {
      this.columnas = 2;
    } else {
      this.columnas = 3;
    }
  }


}
