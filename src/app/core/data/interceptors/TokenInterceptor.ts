import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, catchError, switchMap, take, throwError } from 'rxjs';
import { ShackState } from '../store/shack.reducer';
import { select, Store } from '@ngrx/store';
import * as ShackActions from "../store/shack.actions"
import { ShackSelectors } from '../store';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private store: Store<ShackState>
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${accessToken}` },
      });
    }

    return next.handle(req).pipe(
      catchError((error) => {
        // If access token expired (401), attempt to refresh
        if (error.status === 401) {
          // Dispatch the refresh token request action
          this.store.dispatch(ShackActions.RefreshToken());
          return this.store.pipe(
            select(ShackSelectors.getAuthToken),
            take(1),
            switchMap((newAccessToken) => {
              if (newAccessToken) {
                localStorage.setItem('accessToken', newAccessToken);
                req = req.clone({
                  setHeaders: { Authorization: `Bearer ${newAccessToken}` },
                });
                return next.handle(req);
              }
              return throwError(() => error);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
}
