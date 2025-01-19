import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'actions',
  templateUrl: './actions.component.html',
  standalone: false,
  styleUrl: './actions.component.scss'
})
export class ActionComponent {
  @Input() Accounts: string[] = [
    "Account 1",
    "Account 2",
  ]
  

  get isAdminUser(){
    return true;
  }
}
