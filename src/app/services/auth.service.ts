import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { LoginInterface, UserAuth } from '../interfaces/auth.interface';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiURL = environment.baseURL;

    private currentUser!: UserAuth | null;

    isAuthenticated(): Observable<boolean> {
        if (this.currentUser) {
            return of(true);
        }

        const token = localStorage.getItem('token');
        if (!token) {
            this.currentUser = null;
            return of(false);
        }

        return this.validate().pipe(
            map((resp) => {
                this.currentUser = resp;
                return true;
            }),
            catchError(() => {
                this.currentUser = null;
                return of(false);
            })
        );
    }

    getCurrentUser(): Observable<UserAuth | null> {
        return this.isAuthenticated().pipe(map((isAuthenticated) => (isAuthenticated ? this.currentUser : null)));
    }

    constructor(private http: HttpClient) {}

    login(body: LoginInterface): Observable<UserAuth> {
        const url = `${this.apiURL}/auth/login`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        return this.http.post<UserAuth>(url, body, { headers }).pipe(
            tap((resp) => {
                localStorage.setItem('token', resp.token);
                this.currentUser = resp;
            })
        );
    }

    validate(): Observable<UserAuth> {
        const url = `${this.apiURL}/auth/validate`;
        const token = localStorage.getItem('token');

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        return this.http.post<UserAuth>(url, { token }, { headers }).pipe(
            tap((resp) => {
                this.currentUser = resp;
            })
        );
    }

    renewtoken(): Observable<UserAuth> {
        const url = `${this.apiURL}/auth/renewtoken`;
        const token = localStorage.getItem('token');

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        return this.http.post<UserAuth>(url, { token }, { headers }).pipe(
            tap((resp) => {
                localStorage.setItem('token', resp.token);
                this.currentUser = resp;
            })
        );
    }

    logout(): void {
        localStorage.removeItem('token');
        this.currentUser = null;
    }
}
