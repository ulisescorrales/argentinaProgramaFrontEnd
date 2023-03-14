import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ITecnologia } from 'src/app/interfaces/itecnologia';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-conocimiento-edit',
  templateUrl: './conocimiento-edit.component.html',
  styleUrls: ['./conocimiento-edit.component.css']
})
export class ConocimientoEditComponent implements OnInit {
  id: any;
  formCon: FormGroup;
  x = document.getElementById('status');
  y = document.getElementById('estadoEnvio');
  constructor(private router: Router, private rutaActiva: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) {
    this.formCon = this.formBuilder.group({
      nombre: [''],
      logo: ['']
    });
  }
  ngOnInit(): void {
    this.mostrarSpinner();
    this.rutaActiva.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.api.getTecnologia(this.id).subscribe((data: ITecnologia) => {        
        this.formCon.setValue({
          nombre: data.nombre,
          logo: data.logo
        })
      },
        error => {
          alert("Error al cargar elemento");
          this.router.navigate(['/']);
        },
        ()=>{
          this.borrarSpinner();
        });
    });

  }

  enviarTecnologia() {
    if (this.formCon.touched) {
      if(this.y!=null){
        this.y.innerHTML="";
      }
      this.mostrarSpinner();
      this.api.putTecnologia(this.id, this.formCon.value).subscribe(data => {
        this.borrarSpinner();
        if (this.y != null) {
          this.y.style.color = "green";
          this.y.innerHTML = "Solicitud enviada correctamente"
        }
      },
        error => {
          if (error.status = 401) {
            alert("Error: debe volver a iniciar sesión");
            this.router.navigate(['/login']);
            window.location.reload();
          } else {
            if (this.y != null) {
              this.y.style.color = "red";
              this.y.innerHTML = "Error en solicitud HTTP"
            }
          }
        });
    }
  }
  mostrarSpinner() {
    if (this.x != null) {
      this.x.style.display = "block";
    }
  }
  borrarSpinner() {
    if (this.x != null) {
      this.x.style.display = "none";
    }
  }
}
