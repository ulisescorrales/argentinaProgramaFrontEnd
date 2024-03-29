import { Component, OnInit } from '@angular/core';
import { IDomicilio } from 'src/app/interfaces/idomicilio';
import { ApiService } from 'src/app/servicios/api.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { SpinnerService } from 'src/app/servicios/spinner.service';
import { TemaOscuroService } from 'src/app/servicios/tema-oscuro.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  dom: IDomicilio | undefined;
  autenticado: boolean = false;
  darkTheme=false;
  constructor(private tema:TemaOscuroService,private inicio: SpinnerService, private auth: AutenticacionService, private api: ApiService) { }


  ngOnInit(): void {
    this.api.getDomicilio().subscribe((data: IDomicilio) => {
      this.dom = data;
      this.inicio.sumarComponenteCargado();
    }, error => {
      this.inicio.sumarComponenteCargado();
    }, () => {      
      
    });
    this.autenticado = this.auth.logIn;
    this.tema.getDarkBoolean().subscribe({
      next:(data)=>{
        this.darkTheme=data;
      }
    });
  }

}
