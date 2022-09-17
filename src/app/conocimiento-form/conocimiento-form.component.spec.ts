import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConocimientoFormComponent } from './conocimiento-form.component';

describe('ConocimientoFormComponent', () => {
  let component: ConocimientoFormComponent;
  let fixture: ComponentFixture<ConocimientoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConocimientoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConocimientoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
