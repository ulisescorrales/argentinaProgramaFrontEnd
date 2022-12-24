import { Component, OnInit } from '@angular/core';
import { IEducacion } from 'src/app/clases/IEducacion';
import { ITecnologia } from 'src/app/clases/itecnologia';
import { ApiService } from 'src/app/servicios/api.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';



@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  tamanioKnowledge: any;
  filas: any;
  filasArray: any;
  columnas = 3;
  columnasArray: any;
  editar: boolean = false;

  Math = Math;//Para usar Math.floor() en el HTML

  knowledgeList: any;
  listEducacion: IEducacion[] = new Array<IEducacion>();
  listTecnologia:ITecnologia[]=new Array<ITecnologia>();
  constructor(private datosPortfolio: PortfolioService, private api: ApiService) { }
  ngOnInit(): void {    
    this.datosPortfolio.obtenerDatos().subscribe(data => {                    
      this.editar = data.edit;
    });
    this.api.getAllEducacion().subscribe((data: IEducacion[]) => {
      var ed: IEducacion | undefined;
      var longitud = data.length;
      var item: IEducacion | undefined;      

      for (var i = 0; i < longitud; i++) {
        item = data[i];
        ed = {
          idEstudio: (item as any).idEstudio,
          titulo: (item as any).titulo,
          institucion: (item as any).institucion,
          logo: (item as any).logo,
          estado: (item as any).estado,
          anioIngreso: (item as any).anioIngreso,
          materiasTotales: (item as any).materiasTotales,
          materiasAprobadas: (item as any).materiasAprobadas,
          anioFinalizacion: (item as any).anioFinalizacion
        }
        this.listEducacion.push(item);
      }
    })
    this.api.getAllTecnologia().subscribe((data: ITecnologia[]) => {            
      var longitud = data.length;
      var tec: ITecnologia;
      var item: ITecnologia;

      this.tamanioKnowledge=longitud;
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
      console.log(this.listTecnologia)      
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
  getListEducacion() {
    return this.listEducacion;
  }
  mostrarEditar(item: MouseEvent): void {
    const elemento = (item.target as HTMLElement).parentNode;
    const i = document.createElement("i");
    i.classList.add("fa-sharp");
    i.classList.add("fa-solid");
    i.classList.add("fa-trash");
    i.setAttribute("id", "botonBorrar");

    elemento?.appendChild(i);
    console.log("Activado");
    //<i class="fa-sharp fa-solid fa-trash" id="botonBorrar"></i>
  }
  borrarEditar(item: MouseEvent) {
    document.getElementById("botonBorrar")?.remove();

  }
}
