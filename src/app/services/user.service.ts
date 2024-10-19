import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Pagination, User } from '../interfaces/response.interface';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private apiURL = environment.baseURL;

    constructor(private http: HttpClient) {}

    getList(searchUser: string, pageNumber: number, pageSize: number): Observable<Pagination> {
        const url = `${this.apiURL}/users/?searchUser=${searchUser}&pageNumber=${pageNumber}&pageSize=${pageSize}`;

        const token = localStorage.getItem('token');

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
        });

        return this.http.get<Pagination>(url, { headers });
    }

    getUser(id: string): Observable<User> {
        const url = `${this.apiURL}/users/${id}`;

        const token = localStorage.getItem('token');

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
        });

        return this.http.get<User>(url, { headers });
    }

    createUser(body: User): Observable<User[]> {
        const url = `${this.apiURL}/users`;

        const token = localStorage.getItem('token');

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
        });

        return this.http.post<User[]>(url, body, { headers }).pipe(map((resp) => resp));
    }

    updateUser(id: string, body: User): Observable<User[]> {
        const url = `${this.apiURL}/users/${id}`;

        const token = localStorage.getItem('token');

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
        });

        return this.http.put<User[]>(url, body, { headers }).pipe(map((resp) => resp));
    }

    deleteUser(id: string): Observable<User[]> {
        const url = `${this.apiURL}/users/${id}`;

        const token = localStorage.getItem('token');

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
        });

        return this.http.delete<User[]>(url, { headers }).pipe(map((resp) => resp));
    }
}
