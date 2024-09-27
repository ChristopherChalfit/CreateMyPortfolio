import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'; // Importez platformBrowserDynamic
import { AppModule } from './app/app.module'; // Importez votre module
import { enableProdMode, isDevMode, StaticProvider } from '@angular/core';
import { appConfig } from './app/app.config';

if (isDevMode()) {
  enableProdMode();
}

// ... code existant ...
platformBrowserDynamic()
  .bootstrapModule(AppModule) // Remplacez {...appConfig} par { providers: [] }
  .catch((err: any) => console.error(err));
