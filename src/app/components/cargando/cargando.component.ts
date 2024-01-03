import { AfterContentInit, Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/servicios/spinner.service';
import { TemaOscuroService } from 'src/app/servicios/tema-oscuro.service';

@Component({
  selector: 'app-cargando',
  templateUrl: './cargando.component.html',
  styleUrls: ['./cargando.component.css']
})
export class CargandoComponent implements OnInit,AfterContentInit {
  darkTheme = false;  
  constructor(private spinner:SpinnerService,private tema: TemaOscuroService) {}
  cargado=false;
  ngAfterContentInit(): void {
    this.cargado=true;
  }

  ngOnInit(): void {    
    this.tema.getDarkBoolean().subscribe({
      next: (data) => {
        this.darkTheme=data;
      }
    });    
  }

}
