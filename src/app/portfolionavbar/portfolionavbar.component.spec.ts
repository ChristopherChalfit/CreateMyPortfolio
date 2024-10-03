import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolionavbarComponent } from './portfolionavbar.component';

describe('PortfolionavbarComponent', () => {
  let component: PortfolionavbarComponent;
  let fixture: ComponentFixture<PortfolionavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolionavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolionavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
