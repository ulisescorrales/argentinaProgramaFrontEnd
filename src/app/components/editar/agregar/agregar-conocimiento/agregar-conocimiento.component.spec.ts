import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarConocimientoComponent } from './agregar-conocimiento.component';

describe('AgregarConocimientoComponent', () => {
  let component: AgregarConocimientoComponent;
  let fixture: ComponentFixture<AgregarConocimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarConocimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarConocimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
