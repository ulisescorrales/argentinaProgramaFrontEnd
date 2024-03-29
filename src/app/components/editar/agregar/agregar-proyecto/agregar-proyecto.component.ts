import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-agregar-proyecto',
  templateUrl: './agregar-proyecto.component.html',
  styleUrls: ['./agregar-proyecto.component.css']
})
export class AgregarProyectoComponent implements OnInit {
  formProyecto: UntypedFormGroup;
  y=document.getElementById('status');
  constructor(private autenticacion: AutenticacionService, private router: Router, private api: ApiService, private formBuilder: UntypedFormBuilder) {
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
  }
  agregarProyecto() {
    this.mostrarSpinner();
    if (this.formProyecto.touched) {
      const x = document.getElementById('estadoEnvio');
      this.api.postProyecto(this.formProyecto.value).subscribe(data => {
        if (x != null) {
          alert("Elemento agregado correctamente")
          this.api.actualizarListProyecto();                    
          this.router.navigate(['/']);
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
