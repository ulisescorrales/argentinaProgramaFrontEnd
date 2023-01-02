import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-agregar-proyecto',
  templateUrl: './agregar-proyecto.component.html',
  styleUrls: ['./agregar-proyecto.component.css']
})
export class AgregarProyectoComponent implements OnInit {
  formProyecto: FormGroup;
  constructor(private autenticacion: AutenticacionService, private router: Router, private api: ApiService, private formBuilder: FormBuilder) {
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
        });
    }
  }
}
