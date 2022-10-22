import { Component, OnInit } from '@angular/core';
declare let AOS: any;
//import { PortfolioService } from 'src/app/servicios/portfolio.service';

var editar:boolean;//modo editar o solo lectura
var language:String="es";//idioma

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angProyect';  
  
  //constructor(private global: PortfolioService) { }

  ngOnInit() {
    AOS.init(); 
    
    //this.global.obtenerDatos().subscribe(data => {
    //  console.log(data);      
    //  this.editar=data.edi;
   // });
  }
}
