import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Modeles, ModelesState, selectModeles } from '../store/modeles/modeles-reduces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modeles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modeles.component.html',
  styleUrl: './modeles.component.sass'
})
export class ModelesComponent implements OnInit{
  modeles$: Observable<Modeles[] | null>;
  constructor(private modelesStore: Store<ModelesState>) {
    this.modeles$ = this.modelesStore.select(selectModeles);
  }

  ngOnInit(): void {
  }
}
