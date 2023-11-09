import {Component, OnInit } from '@angular/core';
import { SpinnerService } from './servicios/spinner.service';
import { TemaOscuroService } from './servicios/tema-oscuro.service';
declare let AOS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  darkTheme: boolean = false;
  constructor(private spinner: SpinnerService,private tema:TemaOscuroService) { }
  ngOnInit() {    
    const x = document.getElementById('status');
    if (x != null) {
      x.style.display = "block";
    }
    AOS.init();
    
    this.tema.getDarkBoolean().subscribe({
      next:(data)=>{
        this.darkTheme=data;
      }
    });
  }    

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
