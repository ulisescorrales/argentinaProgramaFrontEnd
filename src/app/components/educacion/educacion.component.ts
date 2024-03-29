import { Component, OnInit } from '@angular/core';
import { IEducacion } from 'src/app/interfaces/IEducacion';
import { ITecnologia } from 'src/app/interfaces/itecnologia';
import { ApiService } from 'src/app/servicios/api.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { SpinnerService } from 'src/app/servicios/spinner.service';
import { TemaOscuroService } from 'src/app/servicios/tema-oscuro.service';



@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {  
  editar: boolean = false;

  Math = Math;//Para usar Math.floor() en el HTML
  darkTheme=false;
  knowledgeList: any;
  listEducacion: IEducacion[] = new Array<IEducacion>();
  listTecnologia:ITecnologia[]=new Array<ITecnologia>();
  constructor(private tema:TemaOscuroService,private inicio:SpinnerService,private api: ApiService,private autenticacion:AutenticacionService) { }
  ngOnInit(): void {        
    this.editar=this.autenticacion.logIn;//    
    this.api.getAllEducacion().subscribe((data: IEducacion[]) => {              
      this.listEducacion=data;
      this.inicio.sumarComponenteCargado();
    }, error => {
      this.inicio.sumarComponenteCargado();
    });
    this.tema.getDarkBoolean().subscribe({
      next: (data)=>{
        this.darkTheme=data;
      }
    });
  }    
}
