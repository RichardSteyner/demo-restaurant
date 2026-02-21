import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, delay, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly TOKEN_KEY = 'auth_token';
    private readonly USER_KEY = 'auth_user';

    private _token = signal<string | null>(localStorage.getItem(this.TOKEN_KEY));
    private _user = signal<any | null>(JSON.parse(localStorage.getItem(this.USER_KEY) || 'null'));

    isAuthenticated = computed(() => !!this._token());
    currentUser = computed(() => this._user());

    constructor(private router: Router) { }

    login(username: string, password: string): Observable<boolean> {
        // Simulating API call
        console.log('Simulating login for:', username);

        // Hardcoded logic for simulation based on test-credentials.json
        // In a real app, this would be an HttpClient call
        let success = false;
        let userData = null;
        let token = null;

        if (username === 'seller1' && password === 'password123') {
            success = true;
            userData = { username: 'seller1', name: 'Juan Perez', role: 'seller' };
            token = 'mock-jwt-token-seller-1';
        } else if (username === 'admin' && password === 'adminpassword') {
            success = true;
            userData = { username: 'admin', name: 'Administrador', role: 'admin' };
            token = 'mock-jwt-token-admin';
        }

        return of(success).pipe(
            delay(1000), // Simulate network delay
            tap(isLoggedIn => {
                if (isLoggedIn && token && userData) {
                    this.setSession(token, userData);
                }
            })
        );
    }

    logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.USER_KEY);
        this._token.set(null);
        this._user.set(null);
        this.router.navigate(['/']);
    }

    private setSession(token: string, user: any): void {
        localStorage.setItem(this.TOKEN_KEY, token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
        this._token.set(token);
        this._user.set(user);
    }
}
