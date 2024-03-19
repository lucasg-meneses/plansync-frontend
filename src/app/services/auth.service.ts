import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Credentials } from '../models/auth/credentials.model';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, tap, throwError } from 'rxjs';
import { AuthResponse } from '../models/auth/auth-response.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl.concat('/auth');
  private tokenKey = 'plan-sync-api';

  constructor(private http: HttpClient) {
    
  }

  login(credentials: Credentials): Observable<AuthResponse> {
    console.log('Tentando fazer login com credenciais:', credentials);
    const loginUrl = `${this.apiUrl}/login`;
    return this.http.post<AuthResponse>("http://localhost:8080/auth/login", credentials)
      .pipe(
        tap(response  => {
          console.log('Resposta do login:', response);
          if (response.token) {
            this.setToken(response.token);
          }
        }),
        catchError(error => {
          console.error('Erro durante a solicitação de login:', error);
          return throwError(error);
        })
      );
  }
  

  logout(): void {
    this.removeToken();
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
