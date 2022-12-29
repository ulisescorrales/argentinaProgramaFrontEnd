import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-agregar-conocimiento',
  templateUrl: './agregar-conocimiento.component.html',
  styleUrls: ['./agregar-conocimiento.component.css']
})
export class AgregarConocimientoComponent implements OnInit {
  formCon: FormGroup;
  constructor(private rutaActiva: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) {
    this.formCon = this.formBuilder.group({
      idTecnologia:[''],
      nombre: [''],
      logo: ['']
    });
  }

  ngOnInit(): void {
  }
  agregarConocimiento(){
    this.api.postTecnologia(this.formCon.value).subscribe();
  }
}
