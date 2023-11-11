import { Component, HostListener, OnInit } from '@angular/core';
import { IPersona } from 'src/app/interfaces/persona';
import { ApiService } from 'src/app/servicios/api.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { SpinnerService } from 'src/app/servicios/spinner.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  editar: boolean = false;
  persona: IPersona | undefined;
  windowWitdth = window.innerWidth;
  constructor(private inicio: SpinnerService, private api: ApiService, private autenticacion: AutenticacionService) { }

  ngOnInit(): void {
    this.editar = this.autenticacion.logIn;
    this.api.getPersona().subscribe({
      next: (data: IPersona) => {
        this.persona = data;
        this.inicio.sumarComponenteCargado();
      }, error: () => {
        this.inicio.sumarComponenteCargado();
      }, complete: () => {

      }
    })
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.windowWitdth = window.innerWidth;
  }
}
