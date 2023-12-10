import { Component, HostListener, OnInit } from '@angular/core';
import { TemaOscuroService } from 'src/app/servicios/tema-oscuro.service';
declare let AOS: any;
@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {
  slide: number = 0;
  darkTheme = false;

  sm = false;
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    if (window.innerWidth < 450) {
      this.sm = true;
    } else {
      this.sm = false;
    }
  }
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
    AOS.init({
      initClassName: "aos-init",
      startEvent: "DOMContentLoaded",
    });

  }
  leftSlide() {
    this.slide--;
    if (this.slide == -1) {
      this.slide = 3;
    }
  }
}
