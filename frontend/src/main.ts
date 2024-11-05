// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Fournir les routes
    provideHttpClient(), // Fournir le HttpClient pour faire des appels HTTP (utile pour l'authentification)
  ],
}).catch((err) => console.error(err));
