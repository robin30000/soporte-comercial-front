import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
      ],
}
