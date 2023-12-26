import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IProyecto } from 'src/app/interfaces/iproyecto';
import { ITarea } from 'src/app/interfaces/itarea';
import { TareaProyecto } from 'src/app/interfaces/tarea-proyecto';
import { ApiService } from 'src/app/servicios/api.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { TemaOscuroService } from 'src/app/servicios/tema-oscuro.service';

@Component({
  selector: 'app-proyecto-edit',
  templateUrl: './proyecto-edit.component.html',
  styleUrls: ['./proyecto-edit.component.css']
})
export class ProyectoEditComponent implements OnInit {
  formProyecto: UntypedFormGroup;
  id = 0;
  x = document.getElementById('status');
  proyecto: IProyecto|undefined;
  darkTheme = false;
  formTarea:FormGroup;
  constructor(private tema: TemaOscuroService, private rutaActiva: ActivatedRoute, private autenticacion: AutenticacionService, private router: Router, private api: ApiService, private formBuilder: UntypedFormBuilder) {
    this.formProyecto = this.formBuilder.group({
      nombre: [],
      logo: [],
      descripcion: [],
      link: [],
      github: [],
      githubFrontEnd: [],
      githubBackEnd: []
    });
    this.formTarea=this.formBuilder.group({
      descripcion:[],
      repositorio:[],
      certificado:[],
      idProyecto:[]
    })
  }

  ngOnInit(): void {
    this.mostrarSpinner();
    this.rutaActiva.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.formTarea.patchValue({
        idProyecto:this.id
      })
      
      this.api.getProyecto(this.id).subscribe((data: IProyecto) => {
        this.borrarSpinner();
        this.proyecto = data;
        this.formProyecto.setValue({
          nombre: data.nombre,
          logo: data.logo,
          descripcion: data.descripcion,
          link: data.link,
          github: data.github,
          githubFrontEnd: data.githubFrontEnd,
          githubBackEnd: data.githubBackEnd
        });
      },
        error => {
          alert("Error cargando el elemento");
          this.router.navigate(['/']);
        });
    });
    this.tema.getDarkBoolean().subscribe({
      next: data => {
        this.darkTheme = data;
      }
    })
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
        () => {
          this.borrarSpinner();
        });
    }
  }
  borrarSpinner() {
    if (this.x != null) {
      this.x.style.display = "none";
    }
  }
  mostrarSpinner() {
    if (this.x != null) {
      this.x.style.display = "block";
    }
  }
  eliminarTareaProyecto(idTarea: Number) {
    this.api.deleteTareaProyecto(idTarea).subscribe({
      next: data => {
        if (data.status == 200) {                  
          if(this.proyecto!=undefined){
            const longitud = this.proyecto?.tareas.length;
            var encontrado=false;
            var i=0;
            var j=-1;
            while(!encontrado && i<longitud ){
              if(this.proyecto.tareas[i].idTarea==idTarea){
                encontrado=true;
                j=i;
              }
              i++;
            }            
            this.proyecto.tareas.splice(j,1);            
          }          
        }
      }
    });
  }
  agregarTareaProyecto(){    
    this.api.postTareaProyecto(this.formTarea.value,this.id).subscribe({
      next: (data:TareaProyecto[])=>{
        if(this.proyecto!=undefined){          
          this.proyecto.tareas=data;          
        }            
      }
    })
  }
}
