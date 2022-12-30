import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-borrar',
  templateUrl: './borrar.component.html',
  styleUrls: ['./borrar.component.css']
})
export class BorrarComponent implements OnInit {

  constructor(private router: Router, private api: ApiService) { }
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
      }
      this.router.navigate(['/']);
      alert("Elemento borrado correctamente");
    },
      error => {
        if (error.status == 401) {
          alert("Error: debe volver a iniciar sesión");
          this.router.navigate(['/login']);
          window.location.reload();
        } else {
          alert("Problema en solicitud HTTP");
          this.router.navigate(['/']);
        }
      });
  }
}
