import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, withLatestFrom, of, switchMap, concatMap, mergeMap, tap} from "rxjs";
import { Store, select } from "@ngrx/store";
import { ShackState } from "./shack.reducer";
import { AuthService, UserService } from "../services";
import * as fromRouter from '@ngrx/router-store';
import * as ShackActions from "./shack.actions";
import { Router } from "@angular/router";

@Injectable()
export class ShackEffects {
  private readonly SNACK_BAR_DURATION = 5000; 

  constructor(
    private store: Store<ShackState>,
    private actions$: Actions,
    private router: Router,
    private userService: UserService,
    private authService: AuthService

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
            localStorage.setItem('accessToken', token.token)
            return ShackActions.AutenticateUserSuccess({ token: token.token })
          } else {
            return ShackActions.AutenticateUserFailure({ error: "Authentication token is null" })
          }
        }),
        catchError(error => of(ShackActions.AutenticateUserFailure({ error: error.message })))
      )
    )
  ));

  loginNavigate$ = createEffect(() => this.actions$.pipe(
      ofType(ShackActions.AutenticateUserSuccess),
      tap(() => {
          this.router.navigate(['/']);
      })
    ), { dispatch: false }
);

  refreshToken$ = createEffect(() => this.actions$.pipe(
    ofType(ShackActions.RefreshToken),
    switchMap(() =>
      this.authService.refreshAccessToken().pipe(
        map((newToken) => ShackActions.RefreshTokenSuccess({ token: newToken.accessToken })),
        catchError((error) => of(ShackActions.RefreshTokenFailure({ error })))
      )
    )
  ));
}