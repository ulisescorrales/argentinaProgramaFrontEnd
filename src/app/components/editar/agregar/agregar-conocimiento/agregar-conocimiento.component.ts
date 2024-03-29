import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-agregar-conocimiento',
  templateUrl: './agregar-conocimiento.component.html',
  styleUrls: ['./agregar-conocimiento.component.css']
})
export class AgregarConocimientoComponent implements OnInit {
  formCon: UntypedFormGroup;
  y = document.getElementById('status');
  constructor(private autenticacion: AutenticacionService, private router: Router, private api: ApiService, private formBuilder: UntypedFormBuilder) {
    this.formCon = this.formBuilder.group({
      idTecnologia: [''],
      nombre: [''],
      logo: ['']
    });
  }

  ngOnInit(): void {
  }
  agregarConocimiento() {
    this.mostrarSpinner();
    const x = document.getElementById('estadoEnvio');
    this.api.postTecnologia(this.formCon.value).subscribe(data => {
      if (x != null) {
        alert("Elemento agregado correctamente");
        this.api.actualizarListConocimiento();
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
      }, () => {
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
