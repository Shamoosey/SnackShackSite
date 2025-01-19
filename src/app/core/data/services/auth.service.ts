import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';

@Injectable()
export class AuthService {
  private readonly apiUrl = 'https://localhost:50501/api/auth';
  private readonly authUrl = `https://discord.com/oauth2/authorize?client_id=1330431556313026580&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fauth%2Fcallback&scope=identify+email`

  constructor(private http: HttpClient) {}

  loginWithDiscord(): Observable<boolean> {
    window.location.href = this.authUrl;
    return of(true);
  }

  handleAuthCallback(code: string) {
    return this.http.post<{token: string}>(`${this.apiUrl}/discord`, { code }, { 
      headers: { "Content-Type": "application/json" }, 
      withCredentials: true
    });
  }

  refreshAccessToken() {
    return this.http.post<{ accessToken: string }>(`${this.apiUrl}/refresh-token`, {}, { withCredentials: true });
  }
}
