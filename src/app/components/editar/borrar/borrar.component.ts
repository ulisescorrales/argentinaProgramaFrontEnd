import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { AlertaService } from 'src/app/servicios/mensajeService';

@Component({
  selector: 'app-borrar',
  templateUrl: './borrar.component.html',
  styleUrls: ['./borrar.component.css']
})
export class BorrarComponent implements OnInit {

  constructor(private alerta:AlertaService,private router: Router, private api: ApiService) { }
  ngOnInit(): void {
    //console.log(this.router.url.split('/'))    
  }
  borrarElemento() {
    this.api.delete(this.router.url).subscribe(data => {
      const clase = this.router.url.split('/')[3];
      //Actualizar sección para que quite el elemento borrado      
      switch (clase) {
        case "educacion":
          this.api.actualizarListEducacion();
          break;
        case "conocimiento":
          this.api.actualizarListConocimiento();
          break;
        case "experiencia":
          this.api.actualizarListExperiencia();
          break;
        case "proyecto":
          this.api.actualizarListProyecto();
          break;
      }
      this.router.navigate(['/']);
      this.alerta.comunicarMensaje("Elemento borrado correctamente","alert-success");
    },
      error => {
        if (error.status == 401) {
          this.alerta.comunicarMensaje("Error: debe volver a iniciar sesión","alert-danger");
          this.router.navigate(['/login']);
          window.location.reload();
        } else {
          this.alerta.comunicarMensaje("Problema en solicitud HTTP","alert-danger");
          this.router.navigate(['/']);
        }
      });
  }
}
