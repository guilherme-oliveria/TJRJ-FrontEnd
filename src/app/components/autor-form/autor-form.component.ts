import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AutorService} from "../../service/autor.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-autor-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterLink,
    HttpClientModule
  ],
  providers:[AutorService],
  templateUrl: './autor-form.component.html',
  styleUrl: './autor-form.component.scss'
})
export class AutorFormComponent implements OnInit {
  autorForm!: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private autorService: AutorService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.loadAutor();
  }

  buildForm() {
    this.autorForm = this.fb.group({
      id: [null],
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]]
    });
  }

  loadAutor() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.isLoading = true;
      this.autorService.getById(+id).subscribe({
        next: autor => this.autorForm.patchValue(autor),
        error: (e) => {
          let erro = e.error.message ? e.error.message : 'Erro ao carregar autor.';
          this.errorMessage = decodeURIComponent(erro) ;
        },
        complete: () => this.isLoading = false
      });
    }
  }

  saveAutor() {
    if (this.autorForm.invalid) {
      this.errorMessage = 'Por favor, corrija os erros no formulário.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const autor = this.autorForm.value;

    if (!autor.id) {
      this.autorService.save(autor).subscribe({
        next: () => this.router.navigate(['/autor']),
        error: (e) => {
          let erro = e.error.message ? e.error.message : 'Erro ao salvar autor.';
          this.errorMessage = decodeURIComponent(erro) ;
          this.isLoading = false;
        }
      });
    } else {
      this.autorService.update(autor).subscribe({
        next: () => this.router.navigate(['/autor']),
        error: (e) => {
          let erro = e.error.message ? e.error.message : 'Erro ao atualizar autor.';
          this.errorMessage = decodeURIComponent(erro) ;
          this.isLoading = false;
        }
      });
    }
  }

}
