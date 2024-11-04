import { Component } from '@angular/core';
import { NavbarPortfolioComponent } from '../navbar-portfolio/navbar-portfolio.component';
import { SectionPortfolioComponent } from '../section-portfolio/section-portfolio.component';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrl: './toolbox.component.sass'
})
export class ToolboxComponent {
  blocks = [
    { type: 'navbar', label: 'Barre de navigation', component: NavbarPortfolioComponent },
    { type: 'Section', label: 'Section', component: SectionPortfolioComponent }

  ];
}
