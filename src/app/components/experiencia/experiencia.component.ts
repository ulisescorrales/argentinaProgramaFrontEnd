import { Component, OnInit } from '@angular/core';
import { IExperiencia } from 'src/app/interfaces/iexperiencia';
import { ApiService } from 'src/app/servicios/api.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { SpinnerService } from 'src/app/servicios/spinner.service';
import { TemaOscuroService } from 'src/app/servicios/tema-oscuro.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  editar: boolean = false;
  listExperiencia: IExperiencia[] = new Array<IExperiencia>();
  darkTheme = false;

  constructor(private tema: TemaOscuroService, private inicio: SpinnerService, private api: ApiService, private autenticacion: AutenticacionService) { }

  ngOnInit(): void {
    this.editar = this.autenticacion.logIn;
    this.api.getAllExperiencia().subscribe({
      next: (data: IExperiencia[]) => {
        this.listExperiencia = data;
        this.inicio.sumarComponenteCargado();
      }, error: () => {
        this.inicio.sumarComponenteCargado();
      }
    });
    this.tema.getDarkBoolean().subscribe({
      next: (data) => {
        this.darkTheme = data;
      }
    });
  }
}
