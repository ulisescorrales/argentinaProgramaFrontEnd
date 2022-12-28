import { Component, OnInit } from '@angular/core';
import { IExperiencia } from 'src/app/clases/iexperiencia';
import { ApiService } from 'src/app/servicios/api.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  editar:boolean=false;
  listExperiencia:IExperiencia[]=new Array<IExperiencia>();  
  constructor(private api:ApiService,private autenticacion:AutenticacionService) { }

  ngOnInit(): void { 
    this.editar=this.autenticacion.logIn;       
    this.api.getAllExperiencia().subscribe((data:IExperiencia[])=>{
      var exp: IExperiencia | undefined;
      var longitud = data.length;
      var item: IExperiencia | undefined;      

      for (var i = 0; i < longitud; i++) {
        item = data[i];
        exp = {
          idExperiencia:item.idExperiencia,
          titulo:item.titulo,
          organizacion:item.organizacion,
          descripcion:item.descripcion,
          logo:item.logo,
          inicio: item.inicio,
          fin:item.fin,          
        }
        this.listExperiencia.push(item);
      }      
    })    
  }
}
