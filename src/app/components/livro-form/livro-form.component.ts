import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {LivroService} from "../../service/livro.service";
import {AutorService} from "../../service/autor.service";
import {AssuntoService} from "../../service/assunto.service";
import {Autor} from "../../model/autor";
import {Assunto} from "../../model/assunto";
import {NgSelectConfig, NgSelectModule} from "@ng-select/ng-select";
import { forkJoin } from 'rxjs';
import {AnoPublicacaoPipe} from "../../pipe/ano-publicacao.pipe";
import {NgxCurrencyDirective} from "ngx-currency";

@Component({
    selector: 'app-livro-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        RouterLink,
        HttpClientModule,
        NgSelectModule,
        AnoPublicacaoPipe,
        NgxCurrencyDirective
    ],
    providers: [LivroService, AutorService, AssuntoService],
    templateUrl: './livro-form.component.html',
    styleUrl: './livro-form.component.scss'
})
export class LivroFormComponent implements OnInit {

    livroForm!: FormGroup;
    isLoading = false;
    errorMessage = '';
    autoresDisponiveis: Autor[] = [];
    assuntosDisponiveis: Assunto[] = [];

    constructor(
        private fb: FormBuilder,
        private livroService: LivroService,
        private autorService: AutorService,
        private assuntoService: AssuntoService,
        public router: Router,
        private activatedRoute: ActivatedRoute,
        private ngSelectConfig: NgSelectConfig
    ) {
        this.buildForm();
    }

    buildForm() {
        this.ngSelectConfig.notFoundText = 'Nenhum item encontrado';
        this.ngSelectConfig.typeToSearchText = 'Digite para pesquisar';

        this.livroForm = this.fb.group({
            id: [null],
            titulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
            editora: ['', [Validators.maxLength(40)]],
            edicao: [null],
            anoPublicacao: ['', [Validators.maxLength(4)]],
            valor: [null, [Validators.required]],
            autores: [[], [Validators.required]],
            assuntos: [[]]
        });
    }

    ngOnInit(): void {
        const id = this.activatedRoute.snapshot.paramMap.get('id');

        if (id) {
            this.isLoading = true;

            forkJoin({
                autores: this.autorService.getAll(),
                assuntos: this.assuntoService.getAll(),
                livro: this.livroService.getById(+id)
            }).subscribe({
                next: ({ autores, assuntos, livro }) => {
                    this.autoresDisponiveis = autores;
                    this.assuntosDisponiveis = assuntos;

                    this.livroForm.patchValue({
                        id: livro.id,
                        titulo: livro.titulo,
                        editora: livro.editora,
                        edicao: livro.edicao,
                        anoPublicacao: livro.anoPublicacao,
                        valor: livro.valor,
                        autores: livro.autores?.map(autor => autor.id) || [],
                        assuntos: livro.assuntos?.map(assunto => assunto.id) || []
                    });
                },
                error: (e) => {
                    this.errorMessage = decodeURIComponent(
                        e.error?.message || 'Erro ao carregar dados'
                    );
                    this.isLoading = false
                },
                complete: () => {
                    this.isLoading = false;
                }
            });
        }else{
            this.isLoading = true;

            forkJoin({
                autores: this.autorService.getAll(),
                assuntos: this.assuntoService.getAll()
            }).subscribe({
                next: ({ autores, assuntos }) => {
                    this.autoresDisponiveis = autores;
                    this.assuntosDisponiveis = assuntos;
                },
                error: (e) => {
                    this.errorMessage = decodeURIComponent(
                        e.error?.message || 'Erro ao carregar dados'
                    );
                    this.isLoading = false
                },
                complete: () => {
                    this.isLoading = false;
                }
            });
        }
    }

    saveLivro() {
        if (this.livroForm.invalid) {
            this.errorMessage = 'Corrija os erros no formulário.';
            return;
        }

        this.isLoading = true;
        this.errorMessage = '';

        const formValue = this.livroForm.value;

        const autoresSelecionados = this.autoresDisponiveis.filter(autor =>
            formValue.autores.includes(autor.id)
        );

        const assuntosSelecionados = this.assuntosDisponiveis.filter(assunto =>
            formValue.assuntos.includes(assunto.id)
        );

        const livro = {
            ...formValue,
            autores: autoresSelecionados,
            assuntos: assuntosSelecionados
        };

        (livro.id ? this.livroService.update(livro) : this.livroService.save(livro))
            .subscribe({
                next: () => this.router.navigate(['/livro']),
                error: (e) => {
                    this.errorMessage = decodeURIComponent(
                        e.error?.message || 'Erro ao processar solicitação'
                    );
                    this.isLoading = false
                },
                complete: () => this.isLoading = false
            });
    }

}
