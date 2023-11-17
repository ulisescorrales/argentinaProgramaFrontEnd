import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-agregar-experiencia',
  templateUrl: './agregar-experiencia.component.html',
  styleUrls: ['./agregar-experiencia.component.css']
})
export class AgregarExperienciaComponent implements OnInit {
  formExperiencia: UntypedFormGroup;
  y=document.getElementById('status');
  constructor(private router:Router,private formBuilder: UntypedFormBuilder, private api: ApiService) {
    this.formExperiencia = this.formBuilder.group({
      idExperiencia: [],
      organizacion: [,[Validators.required]],
      descripcion: [],
      logo: [,Validators.required],
      inicio: [,Validators.required],
      fin: [],
      titulo: [,Validators.required],
    })
  }

  ngOnInit(): void {
  }
  agregarExperiencia(){
    this.mostrarSpinner();
    const x=document.getElementById("estadoEnvio");
    this.api.postExperiencia(this.formExperiencia.value).subscribe(data=>{
      if(x!=null){
        alert("Elemento agregado correctamente")
        this.api.actualizarListExperiencia();
        this.router.navigate(['/'])
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
    },
    ()=>{
      this.borrarSpinner;
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
