import { Component, OnInit } from '@angular/core';
import { IContacto } from 'src/app/clases/contacto';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {

  contactos: IContacto| undefined ;
  constructor(private api: ApiService) {   
    this.api.getContacto().subscribe((data: IContacto) => {
      this.contactos = {
        telefono: data.telefono,
        email:data.email,
        github: data.github,
        facebook: data.facebook,
        linkedin: data.linkedin,
        twitter: data.twitter
      }
    })   
  }

  ngOnInit(): void {    
  }

}
