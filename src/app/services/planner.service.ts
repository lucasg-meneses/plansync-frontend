import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Planner } from '../models/planner.model';
import { Observable, catchError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PlannerService {
  private http: HttpClient = inject(HttpClient);
  private snackBar: MatSnackBar = inject(MatSnackBar);
  private authService: AuthService = inject(AuthService);

  readonly apiUrlPlanner = environment.apiUrl.concat("/planner");


  listAllPlanner(): Observable<Planner[]> {
    const jwtToken = localStorage.getItem(environment.tokenKey);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);
    return this.http.get<Planner[]>(this.apiUrlPlanner, { headers: headers })
      .pipe(catchError((error: HttpErrorResponse) => {
        if (error.status == 403) {
          this.authService.logout();
        }
        throw error
      }));
  }

  getPlannerById(id: string): Observable<Planner> {
    const jwtToken = localStorage.getItem(environment.tokenKey);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);
    const url = this.apiUrlPlanner.concat('/' + id);
    return this.http.get<Planner>(url, { headers: headers })
      .pipe(catchError((error: HttpErrorResponse) => {
        if (error.status == 403) {
          this.authService.logout();
        }
        throw error
      }));
  }
}
