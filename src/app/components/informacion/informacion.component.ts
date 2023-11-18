import { Component, HostListener, OnInit } from '@angular/core';
import { TemaOscuroService } from 'src/app/servicios/tema-oscuro.service';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {
  slide: number = 0;
  darkTheme = false;
  width:number;
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.width=window.innerWidth;
  }
  constructor(private temaOscuro: TemaOscuroService) {
    this.width=window.innerWidth;
   }

  ngOnInit(): void {
    this.temaOscuro.getDarkBoolean().subscribe({
      next: (data)=>{
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
