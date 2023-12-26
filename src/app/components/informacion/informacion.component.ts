import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { TemaOscuroService } from 'src/app/servicios/tema-oscuro.service';
@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css'],
  animations: [trigger('info', [
    state('false', style({ opacity: 0, display: 'none' })),
    state('true', style({ opacity: 1, display: 'block ' })),
    transition('true => false', animate('500ms',
      keyframes([
        style({ display: 'block', opacity: 1, offset: 0 }),
        style({ display: 'block', opacity: 0, offset: 1 })
      ]),
    )),
    transition('false => true', animate('1s 500ms', keyframes([
      style({ display: 'block', opacity: 0, offset: 0 }),
      style({ display: 'block', opacity: 1, offset: 1 })
    ]))),
  ]),
  ]
})
export class InformacionComponent implements OnInit {
  slide: number = 0;
  darkTheme = false;
  @ViewChild('info', { static: false }) info: ElementRef | undefined;
  sm = false;
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    if (window.innerWidth < 450) {
      this.sm = true;
    } else {
      this.sm = false;
    }
  }
  /*@HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {            
  }*/
  constructor(private temaOscuro: TemaOscuroService) {
  }

  ngOnInit(): void {
    this.temaOscuro.getDarkBoolean().subscribe({
      next: (data) => {
        this.darkTheme = data;
      }
    })
  }
  rightSlide() {
    this.slide = (this.slide + 1) % 4;
  }
  leftSlide() {
    this.slide--;
    if (this.slide == -1) {
      this.slide = 3;
    }
  }  
}
