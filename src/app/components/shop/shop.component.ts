import { Component, Input } from '@angular/core';

@Component({
  selector: 'shop',
  templateUrl: './shop.component.html',
  standalone: false,
  styleUrl: './shop.component.scss'
})
export class ShopComponent {
    @Input() BowlCount: number= 0;
}
