import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  

  formEd: FormGroup;
  constructor(private router:Router,private formBuilder: FormBuilder, private datosPortfolio: PortfolioService, private rutaActiva: ActivatedRoute, private api: ApiService) {
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
    const x=document.getElementById('estadoEnvio');
    this.api.postEducacion(this.formEd.value).subscribe(data=>{
      if(x!=null){
        x.style.color="green";
        x.innerHTML="Solicitud enviada correctamente";
        this.api.actualizarListEducacion();
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
    });;
  }
}
