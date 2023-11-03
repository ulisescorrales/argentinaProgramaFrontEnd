import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subject } from 'rxjs';
import { SpinnerService } from './servicios/spinner.service';
declare let AOS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private spinner: SpinnerService) { }

  ngOnInit() {
    this.moverPuntosSuspensivos();
    const x = document.getElementById('status');
    if (x != null) {
      x.style.display = "block";
    }
    AOS.init();        
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
