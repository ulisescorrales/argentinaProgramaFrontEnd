import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-agregar-conocimiento',
  templateUrl: './agregar-conocimiento.component.html',
  styleUrls: ['./agregar-conocimiento.component.css']
})
export class AgregarConocimientoComponent implements OnInit {
  formCon: FormGroup;
  constructor(private router:Router,private rutaActiva: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) {
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
        x.innerHTML="Solicitud enviada correctamente"
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
          x.innerHTML="Solicitud enviada correctamente"
        }
      }      
    });
  }
}
