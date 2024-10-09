import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User, UserState, selectUser } from '../store/auth/auth-reducer';
import { ApiService } from '../api-service.service';
import { loginUser } from '../store/auth/auth-action';
import { getPortfolio } from '../store/portfolio/portfolio-action';
import { Portfolio, PortfolioState, selectPortfolio } from '../store/portfolio/portfolio-reducer';
import { DateFormatService } from '../date-format.service';

@Component({
  selector: 'app-portfolio-component',
  templateUrl: './portfolio-component.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./portfolio-component.component.sass']
  
})
export class PortfolioComponent implements OnInit {
  user$: Observable<Portfolio | null>;
  userId: string | null = null;
  constructor(private route: ActivatedRoute,private router: Router, private store: Store<PortfolioState>,private apiService: ApiService, private dateService: DateFormatService) {
    this.user$ = this.store.select(selectPortfolio);
  }


  ngOnInit(): void {
    const username = 'some-username';
    this.userId = this.route.snapshot.paramMap.get('id');
    this.apiService.getData(`user/name/${this.userId}`).subscribe({
      next: (userResponse) => {
        console.log(userResponse);
        this.store.dispatch(getPortfolio({
          portfolio: {
            id: userResponse.id,
            firstName: userResponse.firstName, 
            lastName: userResponse.lastName, 
            birthDate: this.dateService.formatDate(userResponse.birthDate), 
            email: userResponse.email,
            photoProfile: userResponse.photoProfile,
            phone: userResponse.phone, 
            address: userResponse.address, 
            website: userResponse.website, 
            github: userResponse.github, 
            linkedin: userResponse.linkedin, 
            vehicle: userResponse.vehicle, 
            role: userResponse.role,
            drivingLicenses: userResponse.drivingLicenses, 
            socialLinks: userResponse.socialLinks, 
            languages: userResponse.languages, 
            skills: userResponse.skills, 
            experiences: userResponse.experiences, 
            educations: userResponse.educations 
          }
        }));

        console.log('Action Portfolio dispatchée avec l\'utilisateur :', userResponse);
      },
      error: (error) => {
        console.error("Erreur lors de la récupération des données de l'utilisateur :", error);
      },
    });
  }
}