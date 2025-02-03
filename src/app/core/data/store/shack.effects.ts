import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, withLatestFrom, of, switchMap, concatMap, mergeMap, tap, filter} from "rxjs";
import { Store, select } from "@ngrx/store";
import { ShackState } from "./shack.reducer";
import { AccountService, ExchangeRateService, UserService } from "../services";
import * as fromRouter from '@ngrx/router-store';
import * as ShackActions from "./shack.actions";
import { Router } from "@angular/router";
import { ShackSelectors } from ".";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent, DialogData, DialogResult, InputDialogResult, TransferFundsDialog, TransferFundsDialogData, TransferFundsDialogResult, UpdateAccountInfoDialogComponent, UpdateAccountInfoDialogData } from "../../../shared/components";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class ShackEffects {
  private readonly SNACK_BAR_DURATION = 5000; 

  constructor(
    private store: Store<ShackState>,
    private actions$: Actions,
    private router: Router,
    private userService: UserService,
    private exchangeRateService: ExchangeRateService,
    private accountService: AccountService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  getCurrentUser$ = createEffect(() => this.actions$.pipe(
    ofType(
      ShackActions.GetCurrentUser,
    ),
    switchMap(action => 
      this.userService.getCurrentUser().pipe(
        map(user => ShackActions.GetCurrentUserSuccess({ user })),
        catchError(error => of(ShackActions.GetCurrentUserFailure({ error: error.message })))
      )
    )
  ));

  
  getExchangeRates$ = createEffect(() => this.actions$.pipe(
    ofType(
      ShackActions.GetExchangeRates,
    ),
    switchMap(action => 
      this.exchangeRateService.getExchangeRates().pipe(
        map(result => ShackActions.GetExchangeRatesSuccess({ result })),
        catchError(error => of(ShackActions.GetExchangeRatesFailure({ error: error.message })))
      )
    )
  ));

  updateAmountBalance$ = createEffect(() => this.actions$.pipe(
    ofType(
      ShackActions.UpdateAmountBalance
    ),
    withLatestFrom(
      this.store.select(ShackSelectors.getCurrentUser),
      this.store.select(ShackSelectors.getSelectedAccount)),
    switchMap(([action, user, account]) => {
      if(user && account){
        return this.accountService.updateAccountBalance({
          accountId: account.accountId,
          userId: user.id,
          amount: action.data.amount,
          notes: action.data.notes,
          transactionType: action.data.transactionType
        }).pipe(
          map(result => ShackActions.UpdateAmountBalanceSuccess()),
          catchError(error => of(ShackActions.UpdateAmountBalanceFailure({error: "Unable to update user account"})))
        )
      } else {
        return of(ShackActions.UpdateAmountBalanceFailure({error: "Unable to update user account"}))
      }
    }
    )
  ))

  transferFundsDialog$ = createEffect(() => this.actions$.pipe(
    ofType(
      ShackActions.OpenTransferFundsDialog
    ),
    withLatestFrom(
      this.store.select(ShackSelectors.getUserAccounts),
      this.store.select(ShackSelectors.getExchangeRates),
      this.store.select(ShackSelectors.getCurrentUser),
      this.store.select(ShackSelectors.getSelectedAccount)
    ),
    switchMap(([action, accounts, exchangeRates, currentUser, selectedAccount]) => {
        const dialogRef = this.dialog.open(TransferFundsDialog, { data: { 
          accounts: accounts, 
          exchangeRates: exchangeRates,
          accountId: selectedAccount?.accountId,
          userId: currentUser?.id
        } as TransferFundsDialogData });

        return dialogRef.afterClosed().pipe(
          switchMap((result: TransferFundsDialogResult) => {
            if(result.primaryButtonClicked){
              return of(ShackActions.OpenTransferFundsDialogSuccess({ request: result.data  }));
            } else {
              return of(ShackActions.OpenTransferFundsDialogFailure({}));
            }
          }),
          catchError((error: any) => of(ShackActions.OpenTransferFundsDialogFailure({error: "An error occured while transfering funds"})))
        );
      }
    )
  ));

  transferFundsRequest$ = createEffect(() => this.actions$.pipe(
    ofType(
      ShackActions.OpenTransferFundsDialogSuccess
    ),
    switchMap((action) => {
        return this.accountService.transferFunds(action.request).pipe(
          map(() => ShackActions.TransferAccountFundsSuccess()),
          catchError(() => of(ShackActions.TransferAccountFundsFailure({error: "Unable to transfer funds"})))
        );
      }
    )
  ));

  getUserAccounts$ = createEffect(() => this.actions$.pipe(
    ofType(
      ShackActions.GetCurrentUserSuccess,
      ShackActions.UpdateAmountBalanceSuccess,
      ShackActions.GetUserAccounts,
      ShackActions.TransferAccountFundsSuccess
    ),
    withLatestFrom(this.store.select(ShackSelectors.getCurrentUser)),
    switchMap(([action, user]) => {
      if(user){
        return this.accountService.getUserAccounts(user.id).pipe(
          map(accounts => ShackActions.GetUserAccountsSuccess({ accounts })),
          catchError(error => of(ShackActions.GetUserAccountsFailure({ error: error.message })))
        )
      } else {
        return of(ShackActions.GetUserAccountsFailure({ error: "User is null" }))
      }
    })
  ));

  showSnackBar$ = createEffect(() => this.actions$.pipe(
    ofType(
      ShackActions.TransferAccountFundsFailure,
      ShackActions.GetUserAccountsFailure,
      ShackActions.UpdateAmountBalanceFailure,
      ShackActions.GetCurrentUserFailure

    ),
    tap((action) => {
      this.snackBar.open(action.error, undefined, {duration: this.SNACK_BAR_DURATION});
    })
  ), { dispatch: false }
);


}