import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TemaOscuroService } from 'src/app/servicios/tema-oscuro.service';
@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  darkTheme=false;
  constructor(private dark:TemaOscuroService){}
  ngOnInit(): void{
    this.dark.getDarkBoolean().subscribe({
      next: data =>{
        this.darkTheme=data;
      }
    })    
  }  
}