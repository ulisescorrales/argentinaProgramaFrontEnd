import { Component, OnInit } from '@angular/core';
import { IExperiencia } from 'src/app/clases/iexperiencia';
import { ITarea } from 'src/app/clases/itarea';
import { ApiService } from 'src/app/servicios/api.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  editar:any;
  listExperiencia:IExperiencia[]=new Array<IExperiencia>();  
  constructor(private datosPortfolio: PortfolioService,private api:ApiService) { }

  ngOnInit(): void {    
    this.datosPortfolio.obtenerDatos().subscribe(data => {            
      this.editar=data.edit;
    });
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
