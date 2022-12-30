import { Component, OnInit } from '@angular/core';
import { IPersona } from 'src/app/clases/persona';
import { ApiService } from 'src/app/servicios/api.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  editar:boolean=false;  
  persona:IPersona|undefined;
  constructor(private api:ApiService,private autenticacion:AutenticacionService) { }

  ngOnInit(): void {    
    this.editar=this.autenticacion.logIn;    
    this.api.getPersona().subscribe((data:IPersona)=>{                  
      this.persona=data;
    })
  }

}
