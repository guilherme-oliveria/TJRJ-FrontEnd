import { Component } from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tjrj-front';

  menus = [
    { label: 'Autores', link: '/autor' },
    { label: 'Assuntos', link: '/assunto'},
    { label: 'Livros', link: '/livro' }
  ];
}
