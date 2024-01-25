import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasInstaleTiendasComponent } from './ventas-instale-tiendas.component';

describe('VentasInstaleTiendasComponent', () => {
  let component: VentasInstaleTiendasComponent;
  let fixture: ComponentFixture<VentasInstaleTiendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [VentasInstaleTiendasComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(VentasInstaleTiendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
