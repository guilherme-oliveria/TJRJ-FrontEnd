import {Component, OnInit} from '@angular/core';
import {AutorService} from "../../service/autor.service";
import {Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {HttpClientModule, HttpErrorResponse} from "@angular/common/http";
import {Autor} from "../../model/autor";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-autor-listar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    HttpClientModule
  ],
  providers:[AutorService],
  templateUrl: './autor-listar.component.html',
  styleUrl: './autor-listar.component.scss'
})
export class AutorListarComponent implements OnInit {

  autores: Autor[] = [];
  autorToDelete?: Autor;

  showDeleteModal = false;

  message = '';
  messageClass = '';

  constructor(private autorService: AutorService, private router: Router) {}

  ngOnInit(): void {
    this.loadAutores();
  }

  loadAutores(): void {
    this.autorService.getAll().subscribe({
      next: (res) => this.autores = res,
      error: (err: HttpErrorResponse) => this.showMessage(`Erro ao carregar autores: ${err.error.message}`, 'alert-danger')
    });
  }

  editAutor(autor: Autor): void {
    this.router.navigate([`/autor/${autor.id}/alterar`]);
  }

  createAutor(): void {
    this.router.navigate(['/autor/incluir']);
  }

  openDeleteModal(autor: Autor): void {
    this.autorToDelete = autor;
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    if (!this.autorToDelete) return;

    this.autorService.delete(this.autorToDelete.id!).subscribe({
      next: () => {
        this.showMessage('Autor excluído com sucesso!', 'alert-success');
        this.loadAutores();
      },
      error: (err: HttpErrorResponse) => this.showMessage(`Erro ao excluir autor: ${err.error.message}`, 'alert-danger'),
      complete: () => this.cancelDelete()
    });
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
    this.autorToDelete = undefined;
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
