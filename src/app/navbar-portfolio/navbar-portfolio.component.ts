import { Component, Inject, Input, OnInit } from '@angular/core';
import { Portfolio, PortfolioState, selectPortfolio } from '../store/portfolio/portfolio-reducer';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { Store } from '@ngrx/store';
import { ApiService } from '../api-service.service';
import { DateFormatService } from '../date-format.service';
import { FaviconService } from '../faviconservice.service';

@Component({
  selector: 'app-navbar-portfolio',
  templateUrl: './navbar-portfolio.component.html',
  styleUrl: './navbar-portfolio.component.sass'
})
export class NavbarPortfolioComponent implements OnInit {
  @Input() layout: 'column' | 'row' = 'column';
  menuOpen: boolean = false;
  user$: Observable<Portfolio | null>;
  constructor(@Inject('layout') layout: 'column' | 'row',private route: ActivatedRoute,private router: Router, private store: Store<PortfolioState>,private apiService: ApiService, private dateService: DateFormatService,private viewportScroller: ViewportScroller,private faviconService: FaviconService) {
    this.user$ = this.store.select(selectPortfolio);
    this.layout = layout;
  }

  ngOnInit(): void {
  }
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
