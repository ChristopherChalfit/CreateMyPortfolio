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

  constructor(private apiService: ApiService, private fb: FormBuilder, private store: Store<UserState>) { 
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
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
          console.log('Login réussie :', response);
          if (response && response.access_token) {
            localStorage.setItem('token', response.access_token);
            console.log('Token d\'accès stocké avec succès');
            this.apiService.getDataWithToken('auth').subscribe({
              next: (userResponse) => {
                console.log(userResponse);
                this.store.dispatch(loginUser({
                  user: {
                    id: userResponse.id, 
                    email: userResponse.email,
                    name: userResponse.name,
                    role: userResponse.role
                  }
                }));

                console.log('Action loginUser dispatchée avec l\'utilisateur :', userResponse);
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
          console.log('Inscription réussie :', response);
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