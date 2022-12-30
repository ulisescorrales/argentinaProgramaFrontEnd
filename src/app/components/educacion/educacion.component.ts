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
  editar: boolean = false;

  Math = Math;//Para usar Math.floor() en el HTML

  knowledgeList: any;
  listEducacion: IEducacion[] = new Array<IEducacion>();
  listTecnologia:ITecnologia[]=new Array<ITecnologia>();
  constructor(private api: ApiService,private autenticacion:AutenticacionService) { }
  ngOnInit(): void {        
    this.editar=this.autenticacion.logIn;//    
    this.api.getAllEducacion().subscribe((data: IEducacion[]) => {              
      this.listEducacion=data;
    })    
  }    
}
