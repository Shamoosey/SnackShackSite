import { Component, Input } from '@angular/core';

@Component({
  selector: 'home-container',
  templateUrl: './home-container.html',
  standalone: false,
})
export class HomeContainer {
    @Input() ChipCount: number= 0;
}
