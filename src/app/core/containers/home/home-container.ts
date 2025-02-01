import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ShackState } from '../../data/store/shack.reducer';
import { Store } from '@ngrx/store';
import { ShackActions, ShackSelectors } from '../../data/store';
import { BalanceChangeEvent } from '../../data/models/BalanceChangeEvent';

@Component({
  selector: 'home-container',
  templateUrl: './home-container.html',
  standalone: false,
})
export class HomeContainer implements OnInit, OnChanges {
  userAccounts$ = this.store.select(ShackSelectors.getUserAccounts);
  selectedAccount$ = this.store.select(ShackSelectors.getSelectedAccount);
  currentUser$ = this.store.select(ShackSelectors.getCurrentUser)

  constructor(
    private store: Store<ShackState>
  ) {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    this.store.dispatch(ShackActions.GetExchangeRates())
    this.store.dispatch(ShackActions.GetCurrentUser())
    this.store.dispatch(ShackActions.StartSignalRConnection())
  }

  logout(){
    this.store.dispatch(ShackActions.LogoutUser())
  }

  updateAccountInformation(accountId: string){
    this.store.dispatch(ShackActions.UpdateAccountInfoOpenDialog({ accountId }))
  }

  accountSelectionChange(accountId:string){
    this.store.dispatch(ShackActions.SelectedAccountChange({ accountId }))
  }

  transferFunds(){
    this.store.dispatch(ShackActions.OpenTransferFundsDialog())
  }

  updateAccountBalance(event: BalanceChangeEvent){
    this.store.dispatch(ShackActions.UpdateAmountBalance({data: event}))
  }

  refreshSelectedAccount(){
    this.store.dispatch(ShackActions.GetUserAccounts());
  }
}
