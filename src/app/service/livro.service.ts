import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Livro} from '../model/livro';
import {BaseService} from './base.service';
import {AppConfigService} from './app-config.service';
import {Observable} from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class LivroService extends BaseService<Livro> {
    private appConfigService: AppConfigService;

    constructor(protected override http: HttpClient, appConfigService: AppConfigService) {
        super(http);
        this.appConfigService = appConfigService;
    }

    protected rootUrl(): string {
        return `${this.appConfigService.ambiente.back}/api/v1/livro`;
    }

    downloadRelatorioLivrosPorAutor(): Observable<Blob> {
        const url = `${this.rootUrl()}/relatorio/livros-por-autor`;
        return this.http.get(url, {responseType: 'blob'});
    }

}
