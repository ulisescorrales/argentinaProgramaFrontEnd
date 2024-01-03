import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IEducacion } from 'src/app/interfaces/IEducacion';
import { ApiService } from 'src/app/servicios/api.service';
import { AlertaService } from 'src/app/servicios/mensajeService';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { SpinnerService } from 'src/app/servicios/spinner.service';


@Component({
  selector: 'app-educacion-edit',
  templateUrl: './educacion-edit.component.html',
  styleUrls: ['./educacion-edit.component.css']
})
export class EducacionEditComponent implements OnInit {
  id: number = 0;
  ed: IEducacion | undefined;  
  formEd: UntypedFormGroup;
  x=document.getElementById('status');
  y = document.getElementById('estadoEnvio');  
  constructor(private message:AlertaService,private spinner:SpinnerService,private formBuilder: UntypedFormBuilder, private datosPortfolio: PortfolioService, private rutaActiva: ActivatedRoute, private api: ApiService, private router: Router) {
    this.formEd = this.formBuilder.group({
      institucion: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
      logo: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      anioIngreso: [''],
      anioFinalizacion: [''],
      materiasTotales: [''],
      materiasAprobadas: [''],
      duracion: [''],
      certificado:['',]
    });
  }
  ngOnInit(): void {    
    this.spinner.mostrarSpinner()
    this.rutaActiva.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.api.getEducacion(this.id).subscribe((data: IEducacion) => {
        this.spinner.borrarSpinner();
        this.formEd.setValue({
          institucion: data.institucion,
          logo: data.logo,
          estado: data.estado,
          anioIngreso: data.anioIngreso,
          anioFinalizacion: data.anioFinalizacion,
          titulo: data.titulo,
          materiasTotales: data.materiasTotales,
          materiasAprobadas: data.materiasAprobadas,
          duracion: data.duracion,
          certificado: data.certificado
        })
          ;
      },
      error=>{
        this.spinner.borrarSpinner();        
        this.router.navigate(['/']);
      }      
      )
    });
  }
  modificarEducacion() {    
    if (this.formEd.valid) {      
      this.spinner.mostrarSpinner();
      this.api.putEducacion(this.id, this.formEd.value).subscribe(data => {        
        this.spinner.borrarSpinner();
        if (this.y != null) {          
          this.message.comunicarMensaje("Elemento modificado correctamente","alert-success")           
        }
        this.api.actualizarListEducacion(); 
      },
        error => {
          this.spinner.borrarSpinner();
          if (error.status == 401) {
            this.message.comunicarMensaje("Debe volver a iniciar sesión","alert-danger")
            this.router.navigate(['/login']);
          } else {
            if (this.y != null) {
              this.message.comunicarMensaje("Error en la solicitud HTTP","alert-danger")
            }
          }
        },
        ()=>{
          this.spinner.borrarSpinner();
        })
    }
  }  
}
