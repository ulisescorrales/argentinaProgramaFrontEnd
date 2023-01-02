import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  constructor(private formBuilder: FormBuilder, private datosPortfolio: PortfolioService, private rutaActiva: ActivatedRoute, private api: ApiService, private router: Router) {
    this.formEd = this.formBuilder.group({
      institucion: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
      logo: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      anioIngreso: ['', [Validators.required]],
      anioFinalizacion: ['',],
      materiasTotales: ['', [Validators.required]],
      materiasAprobadas: ['', [Validators.required]],
      duracion: ['']
    });
  }
  ngOnInit(): void {
    const x=document.getElementById('status')
    if(x!=null){
      x.style.display="block";
    }     
    this.rutaActiva.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.api.getEducacion(this.id).subscribe((data: IEducacion) => {
        if(x!=null){
          x.style.display="none";
        }
        this.formEd.setValue({
          institucion: data.institucion,
          logo: data.logo,
          estado: data.estado,
          anioIngreso: data.anioIngreso,
          anioFinalizacion: data.anioFinalizacion,
          titulo: data.titulo,
          materiasTotales: data.materiasTotales,
          materiasAprobadas: data.materiasAprobadas,
          duracion: data.duracion
        })
          ;
      },
      error=>{
        alert("Error al cargar elemento");
        this.router.navigate(['/']);
      }
      )
    });
  }
  modificarEducacion() {
    const x = document.getElementById('estadoEnvio');
    if (this.formEd.valid) {
      const y = document.getElementById('status')
      if (y != null) {
        y.style.display = "block";
      }
      this.api.putEducacion(this.id, this.formEd.value).subscribe(data => {
        if (y != null) {
          y.style.display = "none";
        }
        if (x != null) {
          x.style.color = "green";
          x.innerHTML = "Solicitud enviada correctamente"
          this.api.actualizarListEducacion();      
        }
      },
        error => {
          if (error.status = 401) {
            alert("Error: debe volver a iniciar sesión");
            this.router.navigate(['/login']).then(value=>{
              window.location.reload();
            });            
          } else {
            if (x != null) {
              x.style.color = "red";
              x.innerHTML = "Error en solicitud HTTP"
            }
          }
        })
    }
  }
}
