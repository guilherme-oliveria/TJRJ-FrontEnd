import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {AssuntoService} from "../../service/assunto.service";

@Component({
    selector: 'app-assunto-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        RouterLink,
        HttpClientModule
    ],
    providers: [AssuntoService],
    templateUrl: './assunto-form.component.html',
    styleUrl: './assunto-form.component.scss'
})
export class AssuntoFormComponent implements OnInit {

    assuntoForm!: FormGroup;
    isLoading = false;
    errorMessage = '';

    constructor(
        private fb: FormBuilder,
        private assuntoService: AssuntoService,
        public router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.buildForm();
    }

    ngOnInit(): void {
        this.loadAssunto();
    }

    buildForm() {
        this.assuntoForm = this.fb.group({
            id: [null],
            descricao: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
        });
    }

    loadAssunto() {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        if (id) {
            this.isLoading = true;
            this.assuntoService.getById(+id).subscribe({
                next: assunto => this.assuntoForm.patchValue(assunto),
                error: (e) => {
                    let erro = e.error.message ? e.error.message : 'Erro ao carregar assunto.';
                    this.errorMessage = decodeURIComponent(erro);
                },
                complete: () => this.isLoading = false
            });
        }
    }

    saveAssunto() {
        if (this.assuntoForm.invalid) {
            this.errorMessage = 'Por favor, corrija os erros no formulário.';
            return;
        }

        this.isLoading = true;
        this.errorMessage = '';

        const assunto = this.assuntoForm.value;

        if (!assunto.id) {
            this.assuntoService.save(assunto).subscribe({
                next: () => this.router.navigate(['/assunto']),
                error: (e) => {
                    let erro = e.error.message ? e.error.message : 'Erro ao salvar assunto.';
                    this.errorMessage = decodeURIComponent(erro);
                    this.isLoading = false;
                }
            });
        } else {
            this.assuntoService.update(assunto).subscribe({
                next: () => this.router.navigate(['/assunto']),
                error: (e) => {
                    let erro = e.error.message ? e.error.message : 'Erro ao atualizar assunto.';
                    this.errorMessage = decodeURIComponent(erro);
                    this.isLoading = false;
                }
            });
        }
    }

}

