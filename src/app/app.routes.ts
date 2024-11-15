import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { Authcomponent } from './authcomponent/authcomponent.component';
import { PortfolioComponent } from './portfolio-component/portfolio-component.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './AuthGuard';
import { ModelesComponent } from './modeles/modeles.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'auth', component: Authcomponent},
    {path:'modeles', component: ModelesComponent},
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: ':id', component: PortfolioComponent },
    { path: '**', redirectTo: './' } ,
];
