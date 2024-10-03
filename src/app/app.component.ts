import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  isPortfolioRoute = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const urlSegment = event.urlAfterRedirects.split('/')[1];

        if (urlSegment && this.isPortfolioUrl(urlSegment)) {
          this.isPortfolioRoute = true;
        } else {
          this.isPortfolioRoute = false;
        }
      }
    });
  }

  private isPortfolioUrl(urlSegment: string): boolean {
    const nonPortfolioRoutes = ['auth', 'profile', 'admin', 'settings'];
    if (nonPortfolioRoutes.includes(urlSegment)) {
      return false;
    }
    const userIdPattern = /^[a-zA-Z0-9]+$/;
    const isPortfolio = userIdPattern.test(urlSegment);
    return isPortfolio;
  }
}
