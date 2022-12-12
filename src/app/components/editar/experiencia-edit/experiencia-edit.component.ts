import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PortfolioService } from 'src/app/servicios/portfolio.service';//Servicio

@Component({
  selector: 'app-experiencia-edit',
  templateUrl: './experiencia-edit.component.html',
  styleUrls: ['./experiencia-edit.component.css']
})
export class ExperienciaEditComponent implements OnInit {
  id:any;
  logo:any;
  institution:any;  
  task:any;
  experience:any;
  description:any;
  repository:any;
  //  
  constructor(private datosPortfolio: PortfolioService, private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    this.rutaActiva.params.subscribe((params: Params) => {
      this.id=params['id'];
    });
    this.datosPortfolio.obtenerDatos().subscribe(data => {
      
      this.experience=data.experience[this.id-1];
      this.logo=this.experience.logo;
      this.institution=this.experience.institution;
      this.repository=this.experience.repository;
      this.description=this.experience.description;
      this.task=this.experience.task;      
    });  
  }
  agregarTarea(item:MouseEvent):void{
    const elem=document.getElementById("tareas");
    const agregar=document.createElement;
    console.log(elem);
    console.log(item);
  }
  eliminarTarea(item:MouseEvent):void{

  }
}
