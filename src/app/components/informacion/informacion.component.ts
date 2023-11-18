import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {
  slide:number=0;
  constructor() { }

  ngOnInit(): void {
  }
  rightSlide(){
    this.slide=(this.slide+1)%4;
  }
  leftSlide(){
    this.slide--;
    if(this.slide==-1){
      this.slide=3;
    }
  }
}
