import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivroListarComponent } from './livro-listar.component';

describe('LivroListarComponent', () => {
  let component: LivroListarComponent;
  let fixture: ComponentFixture<LivroListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivroListarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LivroListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
