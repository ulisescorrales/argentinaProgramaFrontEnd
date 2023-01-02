import { Component, OnInit } from '@angular/core';
import { IMensaje } from 'src/app/interfaces/mensaje';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

  listMensaje:IMensaje[]|undefined;
  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.api.getAllMensajes().subscribe((data:IMensaje[])=>{
      this.listMensaje=data;
      const x=document.getElementById('editar');
      if(x!=null){
        x.style.width="100%";
      }
    })
  }

}
