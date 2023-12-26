import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { AlertaService } from 'src/app/servicios/mensajeService';
import { SpinnerService } from 'src/app/servicios/spinner.service';

@Component({
  selector: 'app-agregar-proyecto',
  templateUrl: './agregar-proyecto.component.html',
  styleUrls: ['./agregar-proyecto.component.css']
})
export class AgregarProyectoComponent implements OnInit {
  formProyecto: UntypedFormGroup;
  y = document.getElementById('status');
  constructor(private spinner:SpinnerService,private alerta: AlertaService, private autenticacion: AutenticacionService, private router: Router, private api: ApiService, private formBuilder: UntypedFormBuilder) {
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
      this.spinner.mostrarSpinner();
      this.api.postProyecto(this.formProyecto.value).subscribe({
        next: data => {
          
          this.alerta.comunicarMensaje("Elemento agregado correctamente","alert-success")
          this.api.actualizarListProyecto();
          this.router.navigate(['/']);
        },
        error:()=>{                  
          this.alerta.comunicarMensaje("Error, revise el formulario","alert-danger")
        },
        complete:()=>{
          this.spinner.borrarSpinner();
        }
      })
    }
  }  
}
