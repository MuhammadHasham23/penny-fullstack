import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { productsReducer } from '../products/store/reducers/products.reducer'
import { ProductsEffects } from '../products/store/effects/products.effects';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideStore({products: productsReducer}),
    provideEffects([ProductsEffects]),
    provideHttpClient()
  ],
};
