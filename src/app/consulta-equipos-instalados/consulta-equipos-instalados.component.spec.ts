import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaEquiposInstaladosComponent } from './consulta-equipos-instalados.component';

describe('ConsultaEquiposInstaladosComponent', () => {
  let component: ConsultaEquiposInstaladosComponent;
  let fixture: ComponentFixture<ConsultaEquiposInstaladosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaEquiposInstaladosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaEquiposInstaladosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
