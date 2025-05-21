import {Injectable} from '@angular/core';
import {Assunto} from "../model/assunto";
import {BaseService} from "./base.service";
import {AppConfigService} from "./app-config.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AssuntoService extends BaseService<Assunto> {
    private appConfigService: AppConfigService;

    constructor(protected override http: HttpClient, appConfigService: AppConfigService) {
        super(http);
        this.appConfigService = appConfigService;
    }

    protected rootUrl(): string {
        return `${this.appConfigService.ambiente.back}/api/v1/assunto`;
    }
}
