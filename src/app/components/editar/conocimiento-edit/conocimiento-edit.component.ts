import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IConocimiento } from 'src/app/clases/conocimiento';
import { ITecnologia } from 'src/app/clases/itecnologia';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-conocimiento-edit',
  templateUrl: './conocimiento-edit.component.html',
  styleUrls: ['./conocimiento-edit.component.css']
})
export class ConocimientoEditComponent implements OnInit {
  id: any;
  formCon: FormGroup;
  constructor(private router: Router, private rutaActiva: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) {
    this.formCon = this.formBuilder.group({
      nombre: [''],
      logo: ['']
    });
  }
  ngOnInit(): void {
    this.rutaActiva.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.api.getTecnologia(this.id).subscribe((data: ITecnologia) => {
        this.formCon.setValue({
          nombre: data.nombre,
          logo: data.logo
        })
      });
    });

  }

  enviarTecnologia() {
    if (this.formCon.touched) {
      const x = document.getElementById('estadoEnvio');
      this.api.putTecnologia(this.id, this.formCon.value).subscribe(data => {
        if (x != null) {
          x.style.color = "green";
          x.innerHTML = "Solicitud enviada correctamente"
        }
      },
        error => {
          if (error.status = 401) {
            alert("Error: debe volver a iniciar sesión");
            this.router.navigate(['/login']);
            window.location.reload();
          } else {
            if (x != null) {
              x.style.color = "red";
              x.innerHTML = "Error en solicitud HTTP"
            }
          }
        });
    }
  }
}
