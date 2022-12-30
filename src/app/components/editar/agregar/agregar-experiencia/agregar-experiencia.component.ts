import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-agregar-experiencia',
  templateUrl: './agregar-experiencia.component.html',
  styleUrls: ['./agregar-experiencia.component.css']
})
export class AgregarExperienciaComponent implements OnInit {
  formExperiencia: FormGroup;
  constructor(private router:Router,private formBuilder: FormBuilder, private api: ApiService) {
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
    const x=document.getElementById("estadoEnvio");
    this.api.postExperiencia(this.formExperiencia.value).subscribe(data=>{
      if(x!=null){
        x.style.color="green";
        x.innerHTML="Solicitud enviada correctamente"
        this.api.actualizarListExperiencia();
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
