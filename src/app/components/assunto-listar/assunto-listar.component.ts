import {Component, OnInit} from '@angular/core';
import {HttpClientModule, HttpErrorResponse} from "@angular/common/http";
import {Assunto} from "../../model/assunto";
import {AssuntoService} from "../../service/assunto.service";
import {Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
    selector: 'app-assunto-listar',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterLink,
        HttpClientModule
    ],
    providers: [AssuntoService],
    templateUrl: './assunto-listar.component.html',
    styleUrl: './assunto-listar.component.scss'
})
export class AssuntoListarComponent implements OnInit {

    assuntos: Assunto[] = [];
    assuntoToDelete?: Assunto;

    showDeleteModal = false;
    message = '';
    messageClass = '';

    constructor(private assuntoService: AssuntoService, private router: Router) {
    }

    ngOnInit(): void {
        this.loadAssuntos();
    }

    loadAssuntos(): void {
        this.assuntoService.getAll().subscribe({
            next: (res) => this.assuntos = res,
            error: (err: HttpErrorResponse) => this.showMessage(`Erro ao carregar assuntos: ${err.error.message}`, 'alert-danger')
        });
    }

    editAssunto(assunto: Assunto): void {
        this.router.navigate([`/assunto/${assunto.id}/alterar`]);
    }

    createAssunto(): void {
        this.router.navigate(['/assunto/incluir']);
    }

    openDeleteModal(assunto: Assunto): void {
        this.assuntoToDelete = assunto;
        this.showDeleteModal = true;
    }

    confirmDelete(): void {
        if (!this.assuntoToDelete) return;

        this.assuntoService.delete(this.assuntoToDelete.id!).subscribe({
            next: () => {
                this.showMessage('Assunto excluído com sucesso!', 'alert-success');
                this.loadAssuntos();
            },
            error: (err: HttpErrorResponse) => this.showMessage(`Erro ao excluir assunto: ${err.error.message}`, 'alert-danger'),
            complete: () => this.cancelDelete()
        });
    }

    cancelDelete(): void {
        this.showDeleteModal = false;
        this.assuntoToDelete = undefined;
    }

    private showMessage(msg: string, cssClass: string) {
        this.message = msg;
        this.messageClass = cssClass;

        setTimeout(() => {
            this.message = '';
            this.messageClass = '';
        }, 5000);
    }
}
