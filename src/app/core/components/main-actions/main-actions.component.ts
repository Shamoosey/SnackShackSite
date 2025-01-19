import { Component, EventEmitter, input, Input, Output } from '@angular/core';

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

  @Output() logout = new EventEmitter<void>()
  
  get isAdminUser(){
    return true;
  }

  logoutClick(){
    console.log("test")
    this.logout.emit();
  }
}
