import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User, UserState, selectUser } from '../store/auth/auth-reducer';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.sass'
})
export class ProfileComponent {
  user$: Observable<User | null>;
  constructor(private router: Router, private store: Store<UserState>) {
    this.user$ = this.store.select(selectUser);
  }
}
