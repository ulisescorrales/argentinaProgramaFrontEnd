import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './servicios/spinner.service';
import { TemaOscuroService } from './servicios/tema-oscuro.service';
import { animate, style, transition, trigger } from '@angular/animations';
declare let AOS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('cargando', [      
      transition(':leave', [
        animate('600ms', style({ opacity: 0 }))
      ])
    ]),
  ]
})
export class AppComponent implements OnInit {
  darkTheme: boolean = false;
  cargando = true;
  constructor(private spinner: SpinnerService, private tema: TemaOscuroService) { }
  ngOnInit() {
    const x = document.getElementById('status');
    if (x != null) {
      x.style.display = "block";
    }
    AOS.init();

    this.tema.getDarkBoolean().subscribe({
      next: (data) => {
        this.darkTheme = data;
      }
    });
    this.spinner.getTerminoCargar().subscribe({
      next: (data: boolean) => {
        this.cargando = data;
      }, error: () => {
      }
    });
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
