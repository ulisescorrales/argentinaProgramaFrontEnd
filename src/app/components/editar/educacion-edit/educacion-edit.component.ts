import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IEducacion } from 'src/app/interfaces/IEducacion';
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
  x=document.getElementById('status');
  y = document.getElementById('estadoEnvio');  
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
      duracion: [''],
      certificado:['',]
    });
  }
  ngOnInit(): void {    
    this.mostrarSpinner();    
    this.rutaActiva.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.api.getEducacion(this.id).subscribe((data: IEducacion) => {
        this.borrarSpinner();
        console.log(data);
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
        alert("Error al cargar elemento");
        this.router.navigate(['/']);
      }      
      )
    });
  }
  modificarEducacion() {    
    if (this.formEd.valid) {      
      this.mostrarSpinner();
      this.api.putEducacion(this.id, this.formEd.value).subscribe(data => {        
        if (this.y != null) {
          this.y.style.color = "green";
          this.y.innerHTML = "Solicitud enviada correctamente"               
        }
        this.api.actualizarListEducacion(); 
      },
        error => {
          if (error.status = 401) {
            alert("Error: debe volver a iniciar sesión");
            this.router.navigate(['/login']).then(value=>{
              window.location.reload();
            });            
          } else {
            if (this.y != null) {
              this.y.style.color = "red";
              this.y.innerHTML = "Error en solicitud HTTP"
            }
          }
        },
        ()=>{
          this.borrarSpinner();
        })
    }
  }
  mostrarSpinner(){
    if(this.x!=null){
      this.x.style.display="block";
    } 
  }
  borrarSpinner(){
    if(this.x!=null){
      this.x.style.display="none";
    } 
  }
}
