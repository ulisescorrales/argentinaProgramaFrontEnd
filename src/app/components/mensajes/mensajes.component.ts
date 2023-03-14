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
  x=document.getElementById('status');
  constructor(private api:ApiService) { }

  ngOnInit(): void {
    if(this.x!=null){
      this.x.style.display='block';
    }
    this.api.getAllMensajes().subscribe((data:IMensaje[])=>{
      if(this.x!=null){
        this.x.style.display='none';
      }
      this.listMensaje=data;
      const x=document.getElementById('editar');
      if(x!=null){
        x.style.width="100%";
      }
    })
  }

}
