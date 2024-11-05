import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtiquetaFormComponent } from './etiqueta-form.component';

describe('EtiquetaFormComponent', () => {
  let component: EtiquetaFormComponent;
  let fixture: ComponentFixture<EtiquetaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtiquetaFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EtiquetaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
