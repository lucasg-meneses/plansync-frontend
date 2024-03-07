import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Planner } from '../models/planner.model';

@Injectable({
  providedIn: 'root'
})
export class PlannerService {
  readonly apiUrlPlanner: string;
  constructor(private http: HttpClient) {
    this.apiUrlPlanner = environment.apiUrl.concat("/planner");
  }

  listAllPlanner() {
     return 
  }
}
