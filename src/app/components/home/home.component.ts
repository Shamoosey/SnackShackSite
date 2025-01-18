import { Component, Input } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  standalone: false,
  styleUrl: './home.component.scss'
})
export class HomeComponent {
    @Input() ChipCount: number= 0;
}
