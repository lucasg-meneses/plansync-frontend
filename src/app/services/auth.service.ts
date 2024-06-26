import { Inject, Injectable, PLATFORM_ID, inject} from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Credentials } from '../models/auth/credentials.model';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, tap } from 'rxjs';
import { ɵPLATFORM_BROWSER_ID } from '@angular/common';
import { AuthResponse } from '../models/auth/auth-response.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import UserModel from '../models/auth/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'

})
export class AuthService {
  private apiUrl = environment.apiUrl.concat('/auth');
  private http: HttpClient = inject(HttpClient);
  private snackBar: MatSnackBar = inject(MatSnackBar);
  private router : Router = inject(Router);


  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  public getToken(): string | null {
    if (this.platformId === ɵPLATFORM_BROWSER_ID) {
      return localStorage.getItem(environment.tokenKey);
    }
    return null;
  }


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

          this.snackBar.open('Failed to login. Please check your credentials.', 'Close', {
            duration: 5000,
            panelClass: ['snackbar-error']
          });
          throw error;
        })
      );
  }

  register(user: UserModel): Observable<string> {
    const registerUrl = `${this.apiUrl}/register`;
    return this.http.post<string>(registerUrl, user)
      .pipe(
        tap(() => {
          this.snackBar.open('Successfully registered', 'Close', {
            duration: 5000,
          });
        }), catchError((error: HttpErrorResponse) => {

            this.snackBar.open(error.error, 'Close', {
              duration: 5000,
              panelClass: ['snackbar-error']
            });
          throw error;
        })
      );
  }

  logout(): void {
    this.removeToken();
    this.router.navigate(['login']);
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private setToken(token: string): void {
    localStorage?.setItem(environment.tokenKey, token);
  }

  private removeToken(): void {
    localStorage?.removeItem(environment.tokenKey);
  }
}
