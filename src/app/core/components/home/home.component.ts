import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Account } from '../../data/models/Account';
import { BalanceChangeEvent } from '../../data/models/BalanceChangeEvent';
import { User } from '../../data/models/User';
import { AccountHistory } from '../../data/models/AccountHistory';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: false,
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  @Input() accounts: Account[] = []
  @Input() selectedAccount: Account | null = null;
  @Input() currentUser: User | null = null;
  @Input() accountHistory: AccountHistory[] = []
  
  @Output() accountSelectionChange = new EventEmitter<string>();
  @Output() updateAccountBalance = new EventEmitter<BalanceChangeEvent>();
  @Output() refreshSelectedAccount = new EventEmitter();
  @Output() transferFunds = new EventEmitter<void>();

  ngOnInit(): void {
  }
}
