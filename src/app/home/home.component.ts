import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import Aos from 'aos';
import { Observable } from 'rxjs';
import {
  Modeles,
  ModelesState,
  selectModeles,
} from '../store/modeles/modeles-reduces';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass',
})
export class HomeComponent implements OnInit {
  modeles$: Observable<Modeles[] | null>;
  constructor(
    private router: Router,
    private modelesStore: Store<ModelesState>
  ) {
    this.modeles$ = this.modelesStore.select(selectModeles);
  }
  
  ngOnInit(): void {
  
    Aos.init({
      duration: 2000,
      once: true,
    });
  }
  sortModelesByDate(modeles: Modeles[]): Modeles[] {
    return modeles.sort((a, b) => {
      const dateA = new Date(a.dateCreation.split('/').reverse().join('-'));
      const dateB = new Date(b.dateCreation.split('/').reverse().join('-'));
      return dateB.getTime() - dateA.getTime();
    });
  }
}
