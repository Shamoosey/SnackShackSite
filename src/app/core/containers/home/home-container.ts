import { Component, Input } from '@angular/core';
import { ShackState } from '../../data/store/shack.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'home-container',
  templateUrl: './home-container.html',
  standalone: false,
})
export class HomeContainer {

  constructor(
    private store: Store<ShackState>
  ) {
    
  }

  ngOnInit(): void {
    
  }
}
