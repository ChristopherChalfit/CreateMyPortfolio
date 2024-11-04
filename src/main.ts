import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";
import { enableProdMode, isDevMode, StaticProvider } from "@angular/core";
import { appConfig } from "./app/app.config";
if (isDevMode()) {
    enableProdMode();
}
platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err: any) => console.error(err));

