import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'main-actions',
  templateUrl: './main-actions.component.html',
  standalone: false,
  styleUrl: './main-actions.component.scss'
})
export class MainActionsComponent {
  @Input() Accounts: string[] = [
    "Account 1",
    "Account 2",
  ]
  

  get isAdminUser(){
    return true;
  }
}
