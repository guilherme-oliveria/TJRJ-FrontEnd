import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {LivroService} from "../../service/livro.service";
import {Livro} from "../../model/livro";

@Component({
  selector: 'app-livro-listar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    HttpClientModule
  ],
  providers: [LivroService],
  templateUrl: './livro-listar.component.html',
  styleUrl: './livro-listar.component.scss'
})
export class LivroListarComponent implements OnInit {

  livros: Livro[] = [];
  livroToDelete?: Livro;

  showDeleteModal = false;
  message = '';
  messageClass = '';

  constructor(private livroService: LivroService, private router: Router) {}

  ngOnInit(): void {
    this.loadLivros();
  }

  loadLivros(): void {
    this.livroService.getAll().subscribe({
      next: (res) => this.livros = res,
      error: (err: HttpErrorResponse) => this.showMessage(`Erro ao carregar livros: ${err.error.message}`, 'alert-danger')
    });
  }

  editLivro(livro: Livro): void {
    this.router.navigate([`/livro/${livro.id}/alterar`]);
  }

  openDeleteModal(livro: Livro): void {
    this.livroToDelete = livro;
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    if (!this.livroToDelete) return;

    this.livroService.delete(this.livroToDelete.id!).subscribe({
      next: () => {
        this.showMessage('Livro excluído com sucesso!', 'alert-success');
        this.loadLivros();
      },
      error: (err: HttpErrorResponse) => this.showMessage(`Erro ao excluir livro: ${err.error.message}`, 'alert-danger'),
      complete: () => this.cancelDelete()
    });
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
    this.livroToDelete = undefined;
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
