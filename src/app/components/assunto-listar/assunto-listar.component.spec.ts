import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssuntoListarComponent } from './assunto-listar.component';

describe('AssuntoListarComponent', () => {
  let component: AssuntoListarComponent;
  let fixture: ComponentFixture<AssuntoListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssuntoListarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssuntoListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
