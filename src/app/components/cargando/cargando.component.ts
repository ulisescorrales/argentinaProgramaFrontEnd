import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/servicios/spinner.service';
import { TemaOscuroService } from 'src/app/servicios/tema-oscuro.service';

@Component({
  selector: 'app-cargando',
  templateUrl: './cargando.component.html',
  styleUrls: ['./cargando.component.css']
})
export class CargandoComponent implements OnInit {
  darkTheme = false;  
  constructor(private spinner:SpinnerService,private tema: TemaOscuroService) {}

  ngOnInit(): void {    
    this.tema.getDarkBoolean().subscribe({
      next: (data) => {
        this.darkTheme=data;
      }
    });    
  }

}
