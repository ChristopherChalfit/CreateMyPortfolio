import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApiService } from '../api-service.service';
import { DateFormatService } from '../date-format.service';
import { FaviconService } from '../faviconservice.service';
import { Portfolio, PortfolioState, selectPortfolio } from '../store/portfolio/portfolio-reducer';

@Component({
  selector: 'app-section-portfolio',
  templateUrl: './section-portfolio.component.html',
  styleUrl: './section-portfolio.component.sass'
})
export class SectionPortfolioComponent {
  user$: Observable<Portfolio | null>;
  constructor(private route: ActivatedRoute,private router: Router, private store: Store<PortfolioState>,private apiService: ApiService, private dateService: DateFormatService,private viewportScroller: ViewportScroller,private faviconService: FaviconService) {
    this.user$ = this.store.select(selectPortfolio);
  }
  noContent(contentType: string): string {
    return `Aucune ${contentType} disponible.`;
  }
}
