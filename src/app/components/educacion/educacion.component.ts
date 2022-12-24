import { Component, OnInit } from '@angular/core';
import { IEducacion } from 'src/app/clases/IEducacion';
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

  estudiosList: any; //sera el nombre de la etiqueta con la que vas a buscar en el JSON
  knowledgeList: any;
  listEducacion: IEducacion[]=new Array<IEducacion>();
  constructor(private datosPortfolio: PortfolioService, private api: ApiService) { }
  ngOnInit(): void {
    /* this.rutaActiva.params.subscribe((params:Params) =>{
      const id=params['id'].toString();
      
    })   */
    this.datosPortfolio.obtenerDatos().subscribe(data => {
      this.estudiosList = data.studies;
      this.knowledgeList = data.knowledge;//
      this.tamanioKnowledge = this.knowledgeList.length;//Conseguir la longitud de la lista

      this.filas = Math.ceil(this.tamanioKnowledge / this.columnas);

      this.filasArray = Array(this.filas).fill(this.filas);//Es necesario el fill?
      this.columnasArray = Array(this.columnas).fill(this.columnas);

      this.editar = data.edit;
    });
    this.api.getAllEducacion().subscribe((data: IEducacion[]) => {      
      var ed: IEducacion | undefined;
      var longitud=data.length;
      var item:IEducacion|undefined;
      for(var i=0;i<longitud;i++){
        item=data[i];
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
  }
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
