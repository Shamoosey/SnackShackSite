
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AccountHistory } from '../../data/models/AccountHistory';

@Component({
  selector: 'account-history-table',
  templateUrl: './account-history-table.component.html',
  standalone: false,
  styleUrl: './account-history-table.component.scss'
})
export class AccountHistoryTableComponent implements OnInit, OnChanges{
  @Input() accountHistory: AccountHistory[] = []
  
  dataSource = new MatTableDataSource<AccountHistory>();
  displayedColumns = [
    "changeDate",
    "newAmount",
    "previousAmount",
    "transactionAmount",
    "transactionNotes"
  ]
  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource.data = this.accountHistory
  }
}
