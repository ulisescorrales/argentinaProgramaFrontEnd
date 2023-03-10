import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IProyecto } from 'src/app/interfaces/iproyecto';
import { ApiService } from 'src/app/servicios/api.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-proyecto-edit',
  templateUrl: './proyecto-edit.component.html',
  styleUrls: ['./proyecto-edit.component.css']
})
export class ProyectoEditComponent implements OnInit {
  formProyecto: FormGroup;
  id = 0;
  x=document.getElementById('status');
  constructor(private rutaActiva: ActivatedRoute, private autenticacion: AutenticacionService, private router: Router, private api: ApiService, private formBuilder: FormBuilder) {
    this.formProyecto = this.formBuilder.group({
      nombre: [],
      logo: [],
      descripcion: [],
      link: [],
      github: [],
      githubFrontEnd: [],
      githubBackEnd: []
    });
  }

  ngOnInit(): void {
    this.mostrarSpinner();
    this.rutaActiva.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.api.getProyecto(this.id).subscribe((data: IProyecto) => {
        this.borrarSpinner();
        this.formProyecto.setValue({
          nombre: data.nombre,
          logo: data.logo,
          descripcion: data.descripcion,
          link: data.link,
          github: data.github,
          githubFrontEnd: data.githubFrontEnd,
          githubBackEnd: data.githubBackEnd
        })
      },
      error=>{
        alert("Error cargando el elemento");
        this.router.navigate(['/']);
      });
    });
  }
  modificarProyecto() {
    if (this.formProyecto.touched) {
      this.mostrarSpinner();
      const x = document.getElementById('estadoEnvio');
      this.api.putProyecto(this.id, this.formProyecto.value).subscribe(data => {        
        if (x != null) {
          x.style.color = "green";
          x.innerHTML = "Solicitud enviada correctamente";
          this.api.actualizarListProyecto();
          //Vaciar casilleros
          const y = document.getElementsByClassName('form-control');
          Array.from(y).forEach(elemento => {
            elemento.setAttribute('value', '');
          });

        }
      },
        error => {
          if (error.status == 401) {
            alert("Error: debe volver a iniciar sesión");
            this.router.navigate(['/login']).then(value => {
              window.location.reload();
            });
          } else {
            if (x != null) {
              x.style.color = "red";
              x.innerHTML = "Error. Revise el formulario";
            }
          }
        },
        ()=>{
          this.borrarSpinner();
        });
    }
  }
  borrarSpinner() {
    if(this.x!=null){
      this.x.style.display="none";
    }
  }
  mostrarSpinner(){
    if(this.x!=null){
      this.x.style.display="block";
    }
  }
}
