import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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
  constructor(private datosPortfolio: PortfolioService, private rutaActiva: ActivatedRoute) { }
  ngOnInit(): void {    
      this.rutaActiva.params.subscribe((params: Params) => {
        this.id = params['id'];
      });
      this.datosPortfolio.obtenerDatos().subscribe(data => {
        this.studie = data.studies[this.id - 1];
        this.institution = this.studie.institution;
        this.logo = this.studie.logo;
        this.title = this.studie.title;
        this.state = this.studie.state;
        this.start = this.studie.start;
        this.total = this.studie.totalMaterias;
        this.passed = this.studie.materiasApr;
        this.finish = this.studie.finish;
      });    
  }
}
