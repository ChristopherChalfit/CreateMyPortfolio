import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { selectUser, User, UserState } from '../store/auth/auth-reducer';
import { Store } from '@ngrx/store';
import { ApiService } from '../api-service.service';
import { disconnectUser, loginUser } from '../store/auth/auth-action';
import { DateFormatService } from '../date-format.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.sass',
})
export class NavbarComponent implements OnInit{
  menuOpen: any;
  user$: Observable<User | null>;
  constructor(private router: Router, private store: Store<UserState>,private apiService: ApiService, private dateService: DateFormatService) {
    this.user$ = this.store.select(selectUser);
  }
  ngOnInit(): void {
    if(localStorage.getItem("token")){
      this.apiService.getDataWithToken('auth').subscribe({
        next: (userResponse) => {
          console.log(userResponse);
          this.store.dispatch(loginUser({
            user: {
              id: userResponse.id,
              firstName: userResponse.firstName, 
              lastName: userResponse.lastName, 
              birthDate: this.dateService.formatDate(userResponse.birthDate),
              photoProfile: userResponse.photoProfile,
              linkId: userResponse.linkId,
              email: userResponse.email,
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
          
          console.log('Action loginUser dispatchée avec l\'utilisateur :', userResponse);
       
        },
        error: (error) => {
          console.error("Erreur lors de la récupération des données de l'utilisateur :", error);
        },
      });
    }
  }
  title = 'CreateMyCV';
  redirectToHome() {
    this.router.navigate(['/']);
  }
  logout(){
    localStorage.removeItem("token");
    this.store.dispatch(disconnectUser());
  }
}
