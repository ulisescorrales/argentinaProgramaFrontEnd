import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { IEducacion } from 'src/app/clases/IEducacion';
import { ApiService } from 'src/app/servicios/api.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';


@Component({
  selector: 'app-educacion-edit',
  templateUrl: './educacion-edit.component.html',
  styleUrls: ['./educacion-edit.component.css']
})
export class EducacionEditComponent implements OnInit {
  id: number = 0;
  ed: IEducacion | undefined;

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
    this.rutaActiva.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.api.getEducacion(this.id).subscribe((data: IEducacion) => {
        this.formEd.setValue({
          idEstudio: data.idEstudio,
          institucion: data.institucion,
          logo: data.logo,
          estado: data.estado,
          anioIngreso: data.anioIngreso,
          anioFinalizacion: data.anioFinalizacion,
          titulo: data.titulo,
          materiasTotales: data.materiasTotales,
          materiasAprobadas: data.materiasAprobadas,
        })
          ;
      }
      )
    });
  }
  modificarEducacion() {
    const x = document.getElementById('estadoEnvio');    
    if (this.formEd.valid) {
      this.api.putEducacion(this.id,this.formEd.value).subscribe(data=>{        
        if (x != null) {
          x.style.color = "green";
          x.innerHTML = "Componente modificado con éxito";
        }
      })            
    } else {
      if (x != null) {
        x.style.color = "red";
        x.innerHTML = "Faltan campos requeridos";
      }
    }
  }
}
