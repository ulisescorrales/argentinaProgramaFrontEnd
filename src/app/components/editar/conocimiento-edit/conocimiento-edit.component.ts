import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-conocimiento-edit',
  templateUrl: './conocimiento-edit.component.html',
  styleUrls: ['./conocimiento-edit.component.css']
})
export class ConocimientoEditComponent implements OnInit {
  id:any;
  constructor(private rutaActiva:ActivatedRoute){ }  
  ngOnInit(): void {    
    this.rutaActiva.params.subscribe((params: Params) => {
      const nombre=params['id'].toString();
      this.id=params['id'].toString();      
      console.log(nombre);
    });        
  }

}
