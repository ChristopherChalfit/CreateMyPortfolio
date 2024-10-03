import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfoliofooterComponent } from './portfoliofooter.component';

describe('PortfoliofooterComponent', () => {
  let component: PortfoliofooterComponent;
  let fixture: ComponentFixture<PortfoliofooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfoliofooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfoliofooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
