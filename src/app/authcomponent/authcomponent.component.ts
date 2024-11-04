import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api-service.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { selectUser, User, UserState } from '../store/auth/auth-reducer';
import { Store } from '@ngrx/store';
import { loginUser } from '../store/auth/auth-action';
import { Router } from '@angular/router'; 
import { DateFormatService } from '../date-format.service';

@Component({
  selector: 'app-authcomponent',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './authcomponent.component.html',
  styleUrl: './authcomponent.component.sass',
})
export class Authcomponent implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  user$: Observable<User | null>;

  constructor(private apiService: ApiService, private fb: FormBuilder, private store: Store<UserState>, private router: Router, private dateService: DateFormatService) { 
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
    });

    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLoginSubmit(event: Event) {
    event.preventDefault();

    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.apiService.postData('auth/login', loginData).subscribe({
        next: (response) => {
          if (response && response.access_token) {
            if(this.loginForm.get('rememberMe')?.value === true){
            localStorage.setItem('token', response.access_token);
          }else{
            sessionStorage.setItem('token', response.access_token);
          }
            this.apiService.getDataWithToken('auth').subscribe({
              next: (userResponse) => {
                this.store.dispatch(loginUser({
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
                
                    this.router.navigate(['/profile']); 
              },
              error: (error) => {
                console.error("Erreur lors de la récupération des données de l'utilisateur :", error);
              },
            });
          } else {
            console.warn('Aucun token d\'accès reçu dans la réponse');
          }
        },
        error: (error) => {
          console.error("Erreur lors du login :", error);
        },
      });
    } else {
      console.log('Formulaire de connexion invalide');
    }
  }

  onRegisterSubmit(event: Event) {
    event.preventDefault();

    if (this.registerForm.valid) {
      const registerData = this.registerForm.value;
      this.apiService.postData('auth/register', registerData).subscribe({
        next: (response) => {
           sessionStorage.setItem('token', response.access_token);
          this.apiService.getDataWithToken('auth').subscribe({
            next: (userResponse) => {
              console.log(userResponse);
              this.store.dispatch(loginUser({
                user: {
                  id: userResponse.id,
                  firstName: userResponse.firstName, 
                  lastName: userResponse.lastName, 
                  birthDate: userResponse.birthDate, 
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
              this.router.navigate(['/profile']); 
            },
            error: (error) => {
              console.error("Erreur lors de la récupération des données de l'utilisateur :", error);
            },
          });
        },
        error: (error) => {
          console.error("Erreur lors de l'inscription :", error);
        },
      });
    } else {
      console.log("Formulaire d'inscription invalide");
    }
  }
}