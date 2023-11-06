import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IContacto } from 'src/app/interfaces/contacto';
import { ApiService } from 'src/app/servicios/api.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { SpinnerService } from 'src/app/servicios/spinner.service';
import { TemaOscuroService } from 'src/app/servicios/tema-oscuro.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  editar: boolean = false;
  contactos: IContacto | undefined;
  darkTheme: boolean = false;
  constructor(private tema: TemaOscuroService, private inicio: SpinnerService, private api: ApiService, private autenticacion: AutenticacionService) {
    this.api.getContacto().subscribe({
      next: (data: IContacto) => {
        this.contactos = data;
        this.inicio.sumarComponenteCargado();
      }, error: () => {
        this.inicio.sumarComponenteCargado();
      }
    });
    this.tema.getDarkBoolean().subscribe({
      next: data => {
        this.darkTheme = data;        
      }
    }
    );
  }
  public switchTheme(){
    this.tema.switDarkTheme();
  }
  public ngOnInit(): void {
    this.editar = this.autenticacion.logIn;
  }
  public logout() {
    this.autenticacion.logout();
    window.location.reload();
  }


}
