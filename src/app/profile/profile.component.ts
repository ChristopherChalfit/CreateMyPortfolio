import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User, UserState, selectUser } from '../store/auth/auth-reducer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api-service.service';
import { loginUser } from '../store/auth/auth-action';
import { take } from 'rxjs/operators';
import { DateFormatService } from '../date-format.service';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit , OnDestroy  {
  user$: Observable<User | null>;
  isModalVisible = false;
  activeSection = '';

  openModale(section: string) {
    this.activeSection = section;
    this.isModalVisible = true;
    console.log("modale ouverture" ,section)
  }
  constructor(private fb: FormBuilder, private store: Store<UserState>, private apiService: ApiService, private dateService: DateFormatService) {
    this.user$ = this.store.select(selectUser);
  }
  ngOnDestroy(): void {

  }
  ngOnInit(): void {
 
  }
  

}