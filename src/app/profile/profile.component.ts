import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User, UserState, selectUser } from '../store/auth/auth-reducer';
import { FormBuilder} from '@angular/forms';
import { ApiService } from '../api-service.service';
import { DateFormatService } from '../date-format.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit , OnDestroy  {
  user$: Observable<User | null>;
  isModalVisible = false;
  activeSection = '';
  selectedFile: File | null = null;

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