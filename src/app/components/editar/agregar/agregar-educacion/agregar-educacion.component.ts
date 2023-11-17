import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-agregar-educacion',
  templateUrl: './agregar-educacion.component.html',
  styleUrls: ['./agregar-educacion.component.css']
})
export class AgregarEducacionComponent implements OnInit {
  

  formEd: UntypedFormGroup;
  y=document.getElementById('status');
  constructor(private router:Router,private formBuilder: UntypedFormBuilder, private datosPortfolio: PortfolioService, private api: ApiService) {
    this.formEd = this.formBuilder.group({
      institucion: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
      logo: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      anioIngreso: ['', [Validators.required]],
      anioFinalizacion: ['',],
      materiasTotales: ['', [Validators.required]],
      materiasAprobadas: ['', [Validators.required]],
      duracion: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }
  agregarEducacion(){
    this.mostrarSpinner();
    const x=document.getElementById('estadoEnvio');
    this.api.postEducacion(this.formEd.value).subscribe(data=>{
      if(x!=null){
        alert("Elemento agregado correctamente")
        this.api.actualizarListEducacion();
        this.router.navigate(['/login']);
      }
    },
    error=>{
      if(error.status==401){
        alert("Error: debe volver a iniciar sesión");
        this.router.navigate(['/login']).then(value=>{
          window.location.reload();
        });        
      }else{
        if(x!=null){
          x.style.color="red";
          x.innerHTML="Error. Revise el formulario"
        }
      }  
      this.borrarSpinner();    
    });
  }
  mostrarSpinner() {
    if (this.y != null) {
      this.y.style.display = "block";
    }
  }
  borrarSpinner() {
    if (this.y != null) {
      this.y.style.display = "none";
    }
  }
}
