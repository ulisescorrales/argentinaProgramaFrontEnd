import { Component, OnInit } from '@angular/core';
import { IDomicilio } from 'src/app/clases/idomicilio';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  dom: IDomicilio | undefined;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getDomicilio().subscribe((data: IDomicilio) => {
      this.dom = data;
    })
  }

}
