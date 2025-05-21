import {Routes} from '@angular/router';
import {LivroFormComponent} from "./components/livro-form/livro-form.component";
import {LivroListarComponent} from "./components/livro-listar/livro-listar.component";
import {AutorFormComponent} from "./components/autor-form/autor-form.component";
import {AutorListarComponent} from "./components/autor-listar/autor-listar.component";
import {AssuntoFormComponent} from "./components/assunto-form/assunto-form.component";
import {AssuntoListarComponent} from "./components/assunto-listar/assunto-listar.component";

const assuntoRoutes: Routes = [
    {path: 'assunto', component: AssuntoListarComponent},
    {path: 'assunto/incluir', component: AssuntoFormComponent},
    {path: 'assunto/:id/alterar', component: AssuntoFormComponent}
];

const autorRoutes: Routes = [
    {path: 'autor', component: AutorListarComponent},
    {path: 'autor/incluir', component: AutorFormComponent},
    {path: 'autor/:id/alterar', component: AutorFormComponent}
];

const livroRoutes: Routes = [
    {path: 'livro', component: LivroListarComponent},
    {path: 'livro/incluir', component: LivroFormComponent},
    {path: 'livro/:id/alterar', component: LivroFormComponent}
];

export const routes: Routes = [
    ...assuntoRoutes,
    ...autorRoutes,
    ...livroRoutes
];
