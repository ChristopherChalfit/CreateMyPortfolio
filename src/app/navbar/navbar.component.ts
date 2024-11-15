import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { selectUser, User, UserState } from '../store/auth/auth-reducer';
import { Store } from '@ngrx/store';
import { ApiService } from '../api-service.service';
import { disconnectUser, loginUser } from '../store/auth/auth-action';
import { DateFormatService } from '../date-format.service';
import { Modeles, ModelesState, selectModeles } from '../store/modeles/modeles-reduces';
import { getAllModeles } from '../store/modeles/modeles-actions';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.sass',
})
export class NavbarComponent implements OnInit{
  menuOpen: any;
  user$: Observable<User | null>;
  modeles$: Observable<Modeles[] | null>;
  constructor(private router: Router,  private modelesStore: Store<ModelesState>,private userStore: Store<UserState>,private apiService: ApiService, private dateService: DateFormatService) {
    this.user$ = this.userStore.select(selectUser);
    this.modeles$ = this.modelesStore.select(selectModeles);
  }
  ngOnInit(): void {
    this.fakeModeles();
    if(localStorage.getItem("token")){
      this.apiService.getDataWithToken('auth').subscribe({
        next: (userResponse) => {
          console.log(userResponse);
          this.userStore.dispatch(loginUser({
            user: {
              id: userResponse.id,
              firstName: userResponse.firstName, 
              lastName: userResponse.lastName, 
              birthDate: this.dateService.formatDate(userResponse.birthDate),
              photoProfile: userResponse.photoProfile,
              description: userResponse.description,
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
              educations: userResponse.educations,
              scriptPortfolio: userResponse.scriptPortfolio,
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
    this.userStore.dispatch(disconnectUser());
  }
  fakeModeles(){
    
    const fakeModeles: Modeles[] = [];
    const baseDate = new Date();

    for (let i = 0; i < 20; i++) {
      const day = String(baseDate.getDate()).padStart(2, '0');
      const month = String(baseDate.getMonth() + 1).padStart(2, '0'); 
      const year = baseDate.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;

      fakeModeles.push({
        id: (i + 1).toString(),
        name: `Modèle ${i + 1}`,
        author: `Auteur ${i + 1}`,
        script: `https://picsum.photos/200/300?random=${i + 1}`, 
        isPremium: i % 5 === 0, 
        dateCreation: formattedDate, 
      });
    
      baseDate.setDate(baseDate.getDate() - 1); 
    }
    this.modelesStore.dispatch(getAllModeles({ Modeles: fakeModeles }));

  }
}
