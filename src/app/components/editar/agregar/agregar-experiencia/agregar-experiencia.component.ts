import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-agregar-experiencia',
  templateUrl: './agregar-experiencia.component.html',
  styleUrls: ['./agregar-experiencia.component.css']
})
export class AgregarExperienciaComponent implements OnInit {
  formExperiencia: FormGroup;
  constructor(private formBuilder: FormBuilder, private rutaActiva: ActivatedRoute, private api: ApiService) {
    this.formExperiencia = this.formBuilder.group({
      idExperiencia: [],
      organizacion: [],
      descripcion: [],
      logo: [],
      inicio: [],
      fin: [],
      titulo: [],
    })
  }

  ngOnInit(): void {
  }
  agregarExperiencia(){
    this.api.postExperiencia(this.formExperiencia.value).subscribe();
  }
}
