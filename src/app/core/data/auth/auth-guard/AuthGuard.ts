import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { ShackState } from '../../store/shack.reducer';
import { getAuthToken } from '../../store/shack.selectors';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<ShackState>, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const accessToken = localStorage.getItem('accessToken'); 
    if (accessToken) {
      return new Observable<boolean>((observer) => {
        observer.next(true);
        observer.complete();
      });
    } else {
      this.router.navigate(['/login']);
      return new Observable<boolean>((observer) => {
        observer.next(false);
        observer.complete();
      });
    }
  }
}