import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Account } from '../../data/models/Account';
import { BalanceChangeEvent } from '../../data/models/BalanceChangeEvent';
import { User } from '../../data/models';

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
  
  @Output() logout = new EventEmitter<void>()
  @Output() accountChange = new EventEmitter<string>();
  @Output() updateAccountBalance = new EventEmitter<BalanceChangeEvent>();
  @Output() refreshSelectedAccount = new EventEmitter();

  ngOnInit(): void {
  }
}
