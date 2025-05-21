import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Autor} from '../model/autor';
import {BaseService} from './base.service';
import {AppConfigService} from './app-config.service';

@Injectable({
    providedIn: 'root'
})
export class AutorService extends BaseService<Autor> {
    private appConfigService: AppConfigService;

    constructor(protected override http: HttpClient, appConfigService: AppConfigService) {
        super(http);
        this.appConfigService = appConfigService;
    }

    protected rootUrl(): string {
        return `${this.appConfigService.ambiente.back}/api/v1/autor`;
    }
}
