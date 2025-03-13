import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { Observable, of, switchMap, catchError, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { ShackState } from '../store/shack.reducer';
import { getCurrentUser } from '../store/shack.selectors';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authGuard: AuthGuard,
    private store: Store<ShackState>,
    private router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authGuard.canActivate(next, state).pipe(
      switchMap(isAuthenticated => {
        if (!isAuthenticated) {
          return of(false);
        }
        return this.store.select(getCurrentUser).pipe(
          map(user => {
            if (user?.isAdmin) {
              return true;
            } else {
              this.router.navigate(['/']);
              return false;
            }
          })
        );
      })
    );
  }
}
