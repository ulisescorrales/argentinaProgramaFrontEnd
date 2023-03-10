import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
declare let AOS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{  
  constructor(){}

  ngOnInit() {
    const x=document.getElementById('status');
    if(x!=null){
      x.style.display="block";
    }
    AOS.init();   
  }   
}
