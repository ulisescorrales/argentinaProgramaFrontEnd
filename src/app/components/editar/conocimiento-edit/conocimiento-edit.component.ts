import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { IConocimiento } from 'src/app/clases/conocimiento';
import { ITecnologia } from 'src/app/clases/itecnologia';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-conocimiento-edit',
  templateUrl: './conocimiento-edit.component.html',
  styleUrls: ['./conocimiento-edit.component.css']
})
export class ConocimientoEditComponent implements OnInit {
  id: any;
  formCon: FormGroup;
  constructor(private rutaActiva: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) {
    this.formCon = this.formBuilder.group({
      descripcion: [],
      logo: []
    });
  }
  ngOnInit(): void {
    this.rutaActiva.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.api.getTecnologia(this.id).subscribe((data: ITecnologia) => {
        console.log(data);
        this.formCon.setValue({
          descripcion: data.descripcion,
          logo: data.logo
        })
      });
    });

  }

  enviarTecnologia(){
    if(this.formCon.touched){
      this.api.putTecnologia(this.id,this.formCon.value);
    }
  }
}
