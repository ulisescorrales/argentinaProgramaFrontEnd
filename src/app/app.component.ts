import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subject } from 'rxjs';
import { SpinnerService } from './servicios/spinner.service';
declare let AOS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  darkTheme: boolean = false;
  constructor(private spinner: SpinnerService) { }
  ngAfterViewChecked(): void {

  }
  ngAfterViewInit(): void {
    if (this.darkTheme) {
      const x = document.getElementsByTagName("a");
      for (var i = 0; i < x.length; i++) {
        x[i].classList.add("darkLink");
        (document.getElementById("switchDarkMode") as HTMLInputElement).checked = true;
      }
    }
  }

  ngOnInit() {
    this.moverPuntosSuspensivos();
    const x = document.getElementById('status');
    if (x != null) {
      x.style.display = "block";
    }
    AOS.init();
    //Detectar tema predeterminado del navegador    
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.oscurecer();
    }
    //Reaccionar ante el cambio de tema preferido del navegador
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', ({ matches }) => {
        if (matches) {
          this.oscurecer();
        } else {
          this.aclarar();
        }
      })
  }
  private oscurecer() {
    console.log("change to dark mode!")
    this.darkTheme = true;
    document.getElementsByTagName("body")[0].classList.add("dark");
  }
  private aclarar() {
    this.darkTheme = false;
    document.getElementsByTagName("body")[0].classList.remove("dark");
  }
  public cambiarTemaOscuroClaro() {
    const x = document.getElementsByTagName("p");
    const len = x.length;
    if (this.darkTheme == false) {
      this.oscurecer();
    } else {
      this.aclarar();
    }
  }


  async moverPuntosSuspensivos() {
    var cont = 0;
    var text: string = "Cargando";
    const x = document.getElementById('mensajeDeInicio');

    while (!this.spinner.getCargado()) {
      if (x != null) {
        x.innerHTML = text;
        //Esperar un segundo        
        await this.delay(1000);
        cont++;
        if (cont < 4) {
          text = text + ".";
        } else {
          cont = 0;
          text = "Cargando"
        }
      }
    }
  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
