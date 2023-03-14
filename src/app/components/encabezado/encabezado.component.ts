import { Component, OnInit } from '@angular/core';
import { IContacto } from 'src/app/interfaces/contacto';
import { ApiService } from 'src/app/servicios/api.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { SpinnerService } from 'src/app/servicios/spinner.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {

  editar:boolean=false;
  contactos: IContacto| undefined ;  
  constructor(private inicio:SpinnerService,private api: ApiService,private autenticacion:AutenticacionService){               
    this.api.getContacto().subscribe((data: IContacto) => {
      this.contactos = data;
      this.inicio.sumarComponenteCargado();
    }, error => {      
      this.inicio.sumarComponenteCargado();
    });
  }

  ngOnInit(): void {    
    this.editar=this.autenticacion.logIn;    
  }
  logout(){
    this.autenticacion.logout();
    window.location.reload();
  }
}
