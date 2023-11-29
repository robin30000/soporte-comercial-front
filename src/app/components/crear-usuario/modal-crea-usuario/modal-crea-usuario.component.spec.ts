import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreaUsuarioComponent } from './modal-crea-usuario.component';

describe('ModalCreaUsuarioComponent', () => {
  let component: ModalCreaUsuarioComponent;
  let fixture: ComponentFixture<ModalCreaUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCreaUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCreaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
