import {APP_INITIALIZER, ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {AppConfigService} from "./service/app-config.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {provideHttpClient} from "@angular/common/http";


export function appInitializerFactory(appConfigService: AppConfigService): () => Promise<void> {
  return () => appConfigService.loadConfig().then(() => {});
}

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideHttpClient(),
    provideClientHydration(),
    importProvidersFrom(BrowserAnimationsModule ),
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [AppConfigService],
      multi: true
    }
  ]
};
