import { Component, EventEmitter, input, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Account } from '../../data/models/Account';
import { MatSelectChange } from '@angular/material/select';
import { User } from '../../data/models';
import { UpdateAccountInfoEvent } from '../../data/models/UpdateAccountInfoEvent';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'main-actions',
  templateUrl: './main-actions.component.html',
  standalone: false,
  styleUrl: './main-actions.component.scss'
})
export class MainActionsComponent implements OnInit, OnChanges {
  @Input() currentUser: User | null = null;
  @Input() accounts: Account[] = []
  @Input() selectedAccount: Account | null = null;

  @Output() openAdminPannel = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>()
  @Output() updateAccountInfo = new EventEmitter<string>();
  @Output() accountSelectionChange = new EventEmitter<string>();
  @Output() refreshSelectedAccount = new EventEmitter();
  
  get isAdminUser(){
    return this.currentUser?.isAdmin;
  }

  constructor(    
    private dialog: MatDialog,
  ) {}
  
  ngOnInit(): void {
    
  }

  ngOnChanges (){
  }

  editAccountInfo(){
    if(this.selectedAccount){
      this.updateAccountInfo.emit(this.selectedAccount.accountId)
    }
  }
}
