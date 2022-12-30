import { Component, OnInit } from '@angular/core';
import { IEducacion } from 'src/app/clases/IEducacion';
import { ITecnologia } from 'src/app/clases/itecnologia';
import { ApiService } from 'src/app/servicios/api.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';



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
  constructor(private api: ApiService,private autenticacion:AutenticacionService) { }
  ngOnInit(): void {        
    this.editar=this.autenticacion.logIn;//    
    this.api.getAllEducacion().subscribe((data: IEducacion[]) => {
      var ed: IEducacion | undefined;
      var longitud = data.length;
      var item: IEducacion | undefined;      
      this.listEducacion = new Array<IEducacion>();
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
          anioFinalizacion: (item as any).anioFinalizacion,
          duracion:(item as any).duracion
        }
        this.listEducacion.push(item);
      }
    })    
  }  
  decirHola(){
    console.log("hola");
  }
}
