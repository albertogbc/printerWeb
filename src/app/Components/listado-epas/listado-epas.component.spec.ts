import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoEpasComponent } from './listado-epas.component';

describe('ListadoEpasComponent', () => {
  let component: ListadoEpasComponent;
  let fixture: ComponentFixture<ListadoEpasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoEpasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListadoEpasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
