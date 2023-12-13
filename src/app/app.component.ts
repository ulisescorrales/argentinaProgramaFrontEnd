import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './servicios/spinner.service';
import { TemaOscuroService } from './servicios/tema-oscuro.service';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { SuccessService } from './servicios/success.service';
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
    ])
    ,
    trigger('router', [
      transition(':enter', [
        animate('600ms', keyframes([
          style({ opacity: 0, diplay: 'block', offset: 0 }),
          style({ opacity: 1, offset: 1 }),
        ]))
      ])
    ]),
    trigger('notificacion', [
      //state('false',style({opacity:0})),
      transition(':enter', [
        animate('1s', keyframes([
          //style({ opacity: 0 }),
          style({ top:'85%' })
        ])),
        animate('1s 2s',
          style({ top:'100%' }),
        )
      ]),
    ])
  ]
})
export class AppComponent implements OnInit {
  darkTheme: boolean = false;
  cargando = true;
  mensaje = false;
  mensajeString:String='';
  /*@HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    // Aquí puedes acceder a la posición vertical de la página
    const verticalScrollPosition = window.scrollY;

    // Ahora puedes hacer lo que necesites con la posición vertical
    console.log('Vertical Scroll Position:', verticalScrollPosition);    
  }*/
  constructor(private spinner: SpinnerService, private tema: TemaOscuroService,private success:SuccessService) { }
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
    })
    this.success.getSucces().subscribe((data=>{
      console.log("success: "+data);
    }));
    ;
    this.success.getSucces().subscribe(data=>{
      this.mensajeString=data;
      this.mensaje=true;
    })
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  successEvent(info:Event){
    console.log("evento success");
    this.mensaje=true;
  }
}
