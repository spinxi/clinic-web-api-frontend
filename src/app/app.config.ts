import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { AuthService } from './auth/auth.service';
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),AuthService, provideClientHydration(), provideHttpClient(),  provideToastr(), provideAnimations()]
};
