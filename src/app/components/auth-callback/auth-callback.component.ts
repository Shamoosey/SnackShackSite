import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-auth-callback',
  template: '<p>Redirecting...</p>',
  standalone: false
})
export class AuthCallbackComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private http: HttpClient,
        private router: Router
    ) {}

    ngOnInit(): void {
        // Extract the authorization code from the query parameters
        this.route.queryParams.subscribe((params) => {
        const code = params['code'];
        const error = params['error'];

        if (code) {
            // Send the code to the backend for token exchange
            this.exchangeCodeForToken(code);
        } else if (error) {
            console.error('OAuth2 Error:', error);
            // Handle errors (e.g., user denied permissions)
        } else {
            console.error('No code found in the callback URL.');
            this.router.navigate(['/login']); // Redirect to login if no code is present
        }
        });
    }

    private exchangeCodeForToken(code: string): void {
        this.http
        .post('https://localhost:50501/api/auth/discord', { code }, {headers: { "Access-Control-Allow-Origin": "*"}})
        .subscribe({
            next: (response: any) => {
            console.log('Login successful:', response);
            // Save the JWT/token in local storage or cookies
            localStorage.setItem('token', response.token);

            // Redirect to the homepage or another protected route
            this.router.navigate(['/home']);
            },
            error: (err) => {
                console.error('Error exchanging code:', err);
                // Redirect to an error page or show an error message
                this.router.navigate(['/home']);
            },
        });
    }
}
