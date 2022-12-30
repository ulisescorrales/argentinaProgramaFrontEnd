import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-agregar-conocimiento',
  templateUrl: './agregar-conocimiento.component.html',
  styleUrls: ['./agregar-conocimiento.component.css']
})
export class AgregarConocimientoComponent implements OnInit {
  formCon: FormGroup;
  constructor(private autenticacion:AutenticacionService,private router:Router,private api: ApiService, private formBuilder: FormBuilder) {
    this.formCon = this.formBuilder.group({
      idTecnologia:[''],
      nombre: [''],
      logo: ['']
    });
  }

  ngOnInit(): void {
  }
  agregarConocimiento(){
    const x=document.getElementById('estadoEnvio');
    this.api.postTecnologia(this.formCon.value).subscribe(data=>{
      if(x!=null){
        x.style.color="green";
        x.innerHTML="Solicitud enviada correctamente";
        this.api.actualizarListConocimiento();
        //Vaciar casilleros
        const y=document.getElementsByClassName('form-control');
        Array.from(y).forEach(elemento=>{
          elemento.setAttribute('value','');
        });

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
          x.innerHTML="Error. Revise el formulario";
        }
      }      
    });
  }
}
