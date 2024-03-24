import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Credentials } from '../models/auth/credentials.model';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, tap, finalize } from 'rxjs';
import { AuthResponse } from '../models/auth/auth-response.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'

})
export class AuthService {
  private apiUrl = environment.apiUrl.concat('/auth');
  private http: HttpClient = inject(HttpClient);
  private snackBar: MatSnackBar = inject(MatSnackBar);

  login(credentials: Credentials): Observable<AuthResponse> {
    this.logout()
    const loginUrl = `${this.apiUrl}/login`;
    return this.http.post<AuthResponse>(loginUrl, credentials)
      .pipe(
        tap(response => {
          if (response.token) {
            this.setToken(response.token);
          }
        }), catchError(error => {
          // Handle authentication error
          this.snackBar.open('Failed to login. Please check your credentials.', 'Close', {
            duration: 5000, // Duration of the Snackbar in milliseconds
            panelClass: ['snackbar-error'] // Add custom CSS classes to the Snackbar
          });
          throw error; // Propagate the error to be handled in the component calling the login service, if necessary
        })
      );
  }


  logout(): void {
    this.removeToken();
  }

  static isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private static getToken(): string | null {
    return localStorage.getItem(environment.tokenKey);
  }

  private setToken(token: string): void {
    localStorage.setItem(environment.tokenKey, token);
  }

  private removeToken(): void {
    localStorage.removeItem(environment.tokenKey);
  }
}
