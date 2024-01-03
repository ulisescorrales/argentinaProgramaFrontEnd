import { trigger, transition, animate, style, keyframes } from '@angular/animations';
import { AfterContentInit, Component, OnInit } from '@angular/core';
import { TemaOscuroService } from 'src/app/servicios/tema-oscuro.service';

@Component({
  selector: 'app-cargando',
  templateUrl: './cargando.component.html',
  styleUrls: ['./cargando.component.css'],
  animations: [    
    trigger('load',[
      transition(':enter',[
        animate("300ms",keyframes([
          style({opacity:0,offset:0}),
          style({opacity:1,offset:1})
        ]))
      ])
    ])
  ]
})
export class CargandoComponent implements OnInit, AfterContentInit {
  darkTheme = true;
  loaded=false;
  constructor(private tema: TemaOscuroService) { }  
  ngAfterContentInit(): void {
        this.loaded=true;
  }

  ngOnInit(): void {    
    this.tema.getDarkBoolean().subscribe({
      next: (data) => {
        this.darkTheme = data;
      }      
    });    
  }

}
