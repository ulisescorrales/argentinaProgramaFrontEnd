import { Component, OnInit } from '@angular/core';
declare let AOS: any;
var editar:boolean=false;//modo editar o solo lectura
var language:String="es";//idioma

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angProyect';
  ngOnInit() {
    AOS.init();    
  }
}
