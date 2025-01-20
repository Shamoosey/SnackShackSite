import { Component, EventEmitter, input, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Account } from '../../data/models/Account';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'main-actions',
  templateUrl: './main-actions.component.html',
  standalone: false,
  styleUrl: './main-actions.component.scss'
})
export class MainActionsComponent implements OnInit, OnChanges {
  @Input() accounts: Account[] = []
  @Input() selectedAccount: Account | null = null;

  @Output() openAdminPannel = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>()
  @Output() accountChange = new EventEmitter<string>();
  @Output() refreshSelectedAccount = new EventEmitter();
  
  get isAdminUser(){
    return true;
  }
  
  ngOnInit(): void {
    
  }

  ngOnChanges (){
  }

  editAcountName(){
    
  }
}
