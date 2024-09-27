import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-portfolio-component',
  templateUrl: './portfolio-component.component.html',
  styleUrls: ['./portfolio-component.component.sass']
  
})
export class PortfolioComponent implements OnInit {

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    const username = 'some-username';

  }
}