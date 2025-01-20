import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, withLatestFrom, of, switchMap, concatMap, mergeMap, tap, filter} from "rxjs";
import { Store, select } from "@ngrx/store";
import { ShackState } from "./shack.reducer";
import { AccountService, AuthService, UserService } from "../services";
import * as fromRouter from '@ngrx/router-store';
import * as ShackActions from "./shack.actions";
import { Router } from "@angular/router";
import { ShackSelectors } from ".";
import { MatDialog } from "@angular/material/dialog";
import { InputDialogResult, UpdateAccountInfoDialogComponent, UpdateAccountInfoDialogData } from "../../../shared/components";

@Injectable()
export class ShackEffects {
  private readonly SNACK_BAR_DURATION = 5000; 

  constructor(
    private store: Store<ShackState>,
    private actions$: Actions,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private accountService: AccountService,
    private dialog: MatDialog

  ) {}

  loginUserRedirect$ = createEffect(() => this.actions$.pipe(
    ofType(ShackActions.LoginUser),
    switchMap((action) => {
        return this.authService.loginWithDiscord().pipe(map(res => ShackActions.LoginUserRedirect()));
      }
    )
  ));

  authenticateUser$ = createEffect(() => this.actions$.pipe(
    ofType(ShackActions.AutenticateUser),
    switchMap(action => 
      this.authService.handleAuthCallback(action.code).pipe(
        map(token => {
          if(token){
            return ShackActions.AutenticateUserSuccess({ token: token.token })
          } else {
            return ShackActions.AutenticateUserFailure({ error: "Authentication token is null" })
          }
        }),
        catchError(error => of(ShackActions.AutenticateUserFailure({ error: error.message })))
      )
    )
  ));

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

  
  updateAccountInfo$ = createEffect(() => this.actions$.pipe(
    ofType(
      ShackActions.UpdateAccountInfoOpenDialog
    ),
    withLatestFrom(
      this.store.select(ShackSelectors.getUserAccounts)
    ),
    switchMap(([action, accounts]) => {
        // Open the dialog
        let editedAcct = accounts.find(acct => acct.accountId === action.accountId);
        if(editedAcct) {
          const dialogRef = this.dialog.open(UpdateAccountInfoDialogComponent, {
            data: { 
              accountName: editedAcct.accountName,
              currencyCode: editedAcct.currencyCode 
            } as UpdateAccountInfoDialogData
          });

          return dialogRef.afterClosed().pipe(
            switchMap((result: InputDialogResult) => {
              if(result.primaryButtonClicked && result.inputResult){
                return of(ShackActions.UpdateAccountInfoOpenDialogSuccess({ accountId: action.accountId, data: result.inputResult }));
              } else {
                return of(ShackActions.UpdateAccountInfoOpenDialogFailure({error: "Unable to update account info"}));
              }
            }),
            catchError((error: any) => of(ShackActions.UpdateAccountInfoOpenDialogFailure({error: "Unable to update account info"})))
          );
        } else {
          return of(ShackActions.UpdateAccountInfoOpenDialogFailure({error: "Unable to update account info, can't find account"}));
        }
      }
    )
  ));

  updateAccountInfoRequest$ = createEffect(() => this.actions$.pipe(
    ofType(
      ShackActions.UpdateAccountInfoOpenDialogSuccess
    ),
    withLatestFrom(
      this.store.select(ShackSelectors.getUserAccounts)
    ),
    switchMap(([action, accounts]) => {
        let editedAcct = accounts.find(acct => acct.accountId === action.accountId);
        if(editedAcct) {
          return this.accountService.updateAccountInfo(action.accountId, action.data).pipe(
            map(() => ShackActions.UpdateAccountInfoRequestSuccess()),
            catchError(() => of(ShackActions.UpdateAccountInfoRequestFailure({error: "Unable to update user account"})))
          )
        } else {
          return of(ShackActions.UpdateAccountInfoRequestFailure({error: "Unable to update account info, can't find account"}))
        }
      }
    )
  ))

  getUserAccounts$ = createEffect(() => this.actions$.pipe(
    ofType(
      ShackActions.GetCurrentUserSuccess,
      ShackActions.UpdateAmountBalanceSuccess,
      ShackActions.GetUserAccounts,
      ShackActions.UpdateAccountInfoRequestSuccess
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

  loginNavigate$ = createEffect(() => this.actions$.pipe(
    ofType(
      ShackActions.AutenticateUserSuccess,
      ShackActions.RefreshTokenSuccess
    ),
    withLatestFrom(this.store.pipe(select(ShackSelectors.getIsRefreshingToken))),
    filter(([action, isRefreshing]) => !isRefreshing), // Prevent navigation if token is being refreshed
    tap(() => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        this.router.navigate(['/']);
      }
    })
  ), { dispatch: false });

  logoutNavigation$ = createEffect(() => this.actions$.pipe(
      ofType(
        ShackActions.LogoutUser, 
      ),
      tap(() => {
          this.router.navigate(['/login']);
      })
    ), { dispatch: false }
  );

  refreshToken$ = createEffect(() => this.actions$.pipe(
    ofType(ShackActions.RefreshToken),
    tap(() => this.store.dispatch(ShackActions.SetRefreshingToken({ value: true }))),
    switchMap(() =>
      this.authService.refreshAccessToken().pipe(
        map((newToken) => {
          this.store.dispatch(ShackActions.SetRefreshingToken({ value: false }));
          return ShackActions.RefreshTokenSuccess({ token: newToken.accessToken });
        }),
        catchError((error) => {
          this.store.dispatch(ShackActions.SetRefreshingToken({ value: false }));
          return of(ShackActions.RefreshTokenFailure({ error }));
        })
      )
    )
  ));
}