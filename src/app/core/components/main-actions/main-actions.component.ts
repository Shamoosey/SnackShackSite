import { Component, EventEmitter, Inject, input, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Account } from '../../data/models/Account';
import { User } from '../../data/models';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { environment } from '../../../../environments/environment';

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

  @Output() accountSelectionChange = new EventEmitter<string>();
  @Output() transferFunds = new EventEmitter<void>();
  @Output() refreshSelectedAccount = new EventEmitter();
  
  get isAdminUser(){
    return this.currentUser?.isAdmin;
  }
  

  constructor(    
    private auth: AuthService,
    @Inject(DOCUMENT) private document: Document
  ) {}
  
  ngOnInit(): void {
    
  }

  ngOnChanges (){
  }

  logoutClick(){
    this.auth.logout({ logoutParams: { returnTo: `${environment.auth.authorizationParams.redirect_uri}` } });
  }

  deleteAccountClick(){
    if(this.selectedAccount){
      this.transferFunds.emit();
    }
  }
}
