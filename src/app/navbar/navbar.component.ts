import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { selectUser, User, UserState } from '../store/auth/auth-reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.sass',
})
export class NavbarComponent {
  menuOpen: any;
  user$: Observable<User | null>;
  constructor(private router: Router, private store: Store<UserState>) {
    this.user$ = this.store.select(selectUser);
  }
  title = 'CreateMyCV';
  redirectToHome() {
    this.router.navigate(['/']);
  }
}
