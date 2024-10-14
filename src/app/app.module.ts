import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { provideStore, StoreModule } from '@ngrx/store';
import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  provideRouter,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { appConfig } from './app.config';
import {
  provideStoreDevtools,
  StoreDevtoolsModule,
} from '@ngrx/store-devtools';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import {
  provideHttpClient,
  withFetch,
  withJsonpSupport,
} from '@angular/common/http';
import { routes } from './app.routes';
import { userReducer } from './store/auth/auth-reducer';
import { ProfileComponent } from './profile/profile.component';
import { PortfolionavbarComponent } from './portfolionavbar/portfolionavbar.component';
import { PortfoliofooterComponent } from './portfoliofooter/portfoliofooter.component';
import { portfolioReducer } from './store/portfolio/portfolio-reducer';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CommonModule } from '@angular/common';
import { NgxEditorModule } from 'ngx-editor';
import { ModalComponent } from './modal/modal.component';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    ProfileComponent,
    PortfolionavbarComponent,
    PortfoliofooterComponent,
    ModalComponent,
  ],
  imports: [
    NgxEditorModule.forRoot({
      locals: {
        // menu
        bold: 'Bold',
        italic: 'Italic',
        code: 'Code',
        blockquote: 'Blockquote',
        underline: 'Underline',
        strike: 'Strike',
        bullet_list: 'Bullet List',
        ordered_list: 'Ordered List',
        heading: 'Heading',
        h1: 'Header 1',
        h2: 'Header 2',
        h3: 'Header 3',
        h4: 'Header 4',
        h5: 'Header 5',
        h6: 'Header 6',
        align_left: 'Left Align',
        align_center: 'Center Align',
        align_right: 'Right Align',
        align_justify: 'Justify',
        text_color: 'Text Color',
        background_color: 'Background Color',

        // popups, forms, others...
        url: 'URL',
        text: 'Text',
        openInNewTab: 'Open in new tab',
        insert: 'Insert',
        altText: 'Alt Text',
        title: 'Title',
        remove: 'Remove',
        enterValidUrl: 'Please enter a valid URL',
      },
    }),
    BrowserModule,
    ReactiveFormsModule,
    RouterLink,
    RouterOutlet,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ user: userReducer, portfolio: portfolioReducer }),
    RouterModule.forRoot(routes),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true, // If set to true, the connection is established within the Angular zone
    }),
  ],
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch(), withJsonpSupport()),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true,
    }),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
