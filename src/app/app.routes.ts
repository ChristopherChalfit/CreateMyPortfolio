import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Authcomponent } from './authcomponent/authcomponent.component';
import { PortfolioComponent } from './portfolio-component/portfolio-component.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'auth', component: Authcomponent },
    { path: ':username', component: PortfolioComponent }
];
