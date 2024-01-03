import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './servicios/spinner.service';
import { TemaOscuroService } from './servicios/tema-oscuro.service';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { AlertaService } from './servicios/mensajeService';
declare let AOS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('cargando', [
      transition(':leave', [
        animate('200ms', style({opacity:0}))
      ])
    ]),
    ,
    trigger('router', [
      transition(':enter', [
        animate('600ms', keyframes([
          style({ opacity: 0, display: 'block', offset: 0 }),
          style({ opacity: 1, offset: 1 }),
        ]))
      ])
    ]),
    trigger('notificacion', [
      transition(':enter', [
        animate('1s', keyframes([
          style({ top: '85%' })
        ])),
        animate('1s 2s',
          style({ top: '100%' }),
        )
      ]),
      state('void', style({ top: '100%' })),
    ])
  ]
})
export class AppComponent implements OnInit {
  darkTheme: boolean = false;
  cargando = true;
  mensaje = false;
  mensajeString: String = '';
  tipoAlerta: String = 'alert-success';
  apareceCargando = false;
  /*@HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    // Aquí puedes acceder a la posición vertical de la página
    const verticalScrollPosition = window.scrollY;

    // Ahora puedes hacer lo que necesites con la posición vertical
    console.log('Vertical Scroll Position:', verticalScrollPosition);    
  }*/
  constructor(private spinner: SpinnerService, private tema: TemaOscuroService, private alerta: AlertaService) { }
  ngOnInit() {
    if (window.innerWidth < 768) {
      AOS.init({
        once: true
      });
    } else {
      AOS.init();
    }

    this.tema.getDarkBoolean().subscribe({
      next: (data) => {
        this.darkTheme = data;
      }
    });
    this.spinner.getCargando().subscribe({
      next: (data) => {
        this.cargando = data;
      }
    });
    this.alerta.getMensaje().subscribe(data => {
      //Si se estaba ejecutando otra transición, reiniciar      
      this.mensaje = false;
      setTimeout(() => {
        this.mensajeString = data.mensaje;
        this.tipoAlerta = data.tipoAlerta;
        this.mensaje = true;
      })
    });
  }
}
