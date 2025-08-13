import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { appRoutes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [appRoutes, importProvidersFrom(HttpClientModule)],
}).catch((err) => console.error(err));
