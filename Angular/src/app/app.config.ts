import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideBrowserGlobalErrorListeners } from '@angular/core';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { authInterceptor } from './interceptors/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // HTTP Client avec interceptor - DOIT ÊTRE EN PREMIER
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    
    // Router
    provideRouter(routes),
    
    // PrimeNG
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    
    // Error handling
    provideBrowserGlobalErrorListeners()
  ]
};