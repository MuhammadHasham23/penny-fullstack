import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {environment} from '../environment'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/api/auth/login`, { email, password }).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/api/auth/register`, { username, email, password }).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  sendPasswordResetLink(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/reset-password`, { token, password: newPassword });
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
