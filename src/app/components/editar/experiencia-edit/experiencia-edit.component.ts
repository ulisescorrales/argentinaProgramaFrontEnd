import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { IExperiencia } from 'src/app/clases/iexperiencia';
import { ApiService } from 'src/app/servicios/api.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';//Servicio

@Component({
  selector: 'app-experiencia-edit',
  templateUrl: './experiencia-edit.component.html',
  styleUrls: ['./experiencia-edit.component.css']
})
export class ExperienciaEditComponent implements OnInit {
  id: any;
  formExperiencia: FormGroup;
  constructor(private formBuilder: FormBuilder, private rutaActiva: ActivatedRoute, private api: ApiService) {
    this.formExperiencia = this.formBuilder.group({
      idExperiencia: [],
      organizacion: [],
      descripcion: [],
      logo: [],
      inicio: [],
      fin: [],
      titulo: [],
    })
  }

  ngOnInit(): void {
    this.rutaActiva.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.api.getExperiencia(this.id).subscribe((data: IExperiencia) => {
        this.formExperiencia.setValue({
          idExperiencia: data.idExperiencia,
          organizacion: data.organizacion,
          descripcion: data.descripcion,
          logo: data.logo,
          inicio: data.inicio,
          fin: data.fin,
          titulo: data.titulo,
        })
      })
    });

  }
  agregarTarea(item: MouseEvent): void {
    const elem = document.getElementById("tareas");
    const agregar = document.createElement;
    console.log(elem);
    console.log(item);
  }
  eliminarTarea(item: MouseEvent): void {

  }
  enviarExperiencia(){
    if(this.formExperiencia.touched){
      this.api.putExperiencia(this.id,this.formExperiencia.value).subscribe();
    }
  }
}
