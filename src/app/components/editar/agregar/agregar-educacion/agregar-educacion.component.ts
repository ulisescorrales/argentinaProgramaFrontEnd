import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-agregar-educacion',
  templateUrl: './agregar-educacion.component.html',
  styleUrls: ['./agregar-educacion.component.css']
})
export class AgregarEducacionComponent implements OnInit {
  

  formEd: FormGroup;
  constructor(private formBuilder: FormBuilder, private datosPortfolio: PortfolioService, private rutaActiva: ActivatedRoute, private api: ApiService) {
    this.formEd = this.formBuilder.group({
      institucion: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
      logo: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      anioIngreso: ['', [Validators.required]],
      anioFinalizacion: ['',],
      materiasTotales: ['', [Validators.required]],
      materiasAprobadas: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }
  agregarEducacion(){
    this.api.postEducacion(this.formEd.value).subscribe();
  }
}
