import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { IEducacion } from 'src/app/clases/iEducacion';
import { ApiService } from 'src/app/servicios/api.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';


@Component({
  selector: 'app-educacion-edit',
  templateUrl: './educacion-edit.component.html',
  styleUrls: ['./educacion-edit.component.css']
})
export class EducacionEditComponent implements OnInit {
  id: number = 0;
  studie: any;
  institution: any;
  logo: any;
  title: any;
  state: any;
  start: any;
  total: any;
  passed: any;
  finish: any;
  ed!: IEducacion;
  
  form:FormGroup;
  constructor(private formBuilder:FormBuilder,private datosPortfolio: PortfolioService, private rutaActiva: ActivatedRoute,private api:ApiService) {     
    this.form=this.formBuilder.group({
      institucion:['',[Validators.required]],
      titulo:['',[Validators.required]],
      logo:['',[Validators.required]],
      estado:['',[Validators.required]],
      anioIngreso:['',[Validators.required]],
      anioFinalizacion:['',[Validators.required]],
      materiasTotales:['',[Validators.required]],
      materiasAprobadas:['',[Validators.required]]
    });
  }
  ngOnInit(): void {    
      this.rutaActiva.params.subscribe((params: Params) => {
        this.id = params['id'];
      });
      this.api.getEducacion(this.ed.id).subscribe(data=>{
        console.log(data);
      })
      /*this.datosPortfolio.obtenerDatos().subscribe(data => {
        this.studie = data.studies[this.id - 1];
        this.institution = this.studie.institution;
        this.logo = this.studie.logo;
        this.title = this.studie.title;
        this.state = this.studie.state;
        this.start = this.studie.start;
        this.total = this.studie.totalMaterias;
        this.passed = this.studie.materiasApr;
        this.finish = this.studie.finish;
      });    */
  }  
  modificarEducacion(){
    const x=document.getElementById('estadoEnvio');
    console.log(this.form.valid);
    if(this.form.valid){
      console.log(this.form.value);
      if(x!=null){
        x.style.color="green";
        x.innerHTML="Componente modificado con éxito";
      }
    }else{      
      if(x!=null){
        x.style.color="red";
        x.innerHTML="Faltan campos requeridos";
      }      
    }
  }
}
