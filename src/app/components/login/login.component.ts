import { Component, OnInit } from '@angular/core';
import{FormBuilder,FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup;
  constructor(private formBuilder:FormBuilder,private autenticationService:AutenticacionService,private ruta:Router) { 
    this.form=this.formBuilder.group({
      nombreUsuario:['',[Validators.required]],
      password:['',[Validators.required]]      
    });
  }

  ngOnInit(): void {
  }
  
  get Email(){
    return this.form.get('nombreUsuario');
  }
  get Password(){
    return this.form.get('password')
  }

  onEnviar(event:Event){
    event.preventDefault;//Prevenir evento del formulario
    this.autenticationService.IniciarSesion(this.form.value).subscribe(data=>{
      console.log('DATA: '+JSON.stringify(data))
      this.ruta.navigate(['/']).then(value=>{window.location.reload()});
    },
    error=>{
      let x=document.getElementById('estadoLogin');
      if(x!=null){
        x.style.color="red";
        x.innerHTML="Error de autenticación";
      }
    })
  }  
}
