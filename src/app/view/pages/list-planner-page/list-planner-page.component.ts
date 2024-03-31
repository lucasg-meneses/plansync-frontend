import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { PlannerService } from '../../../services/planner.service';
import { Planner } from '../../../models/planner.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { formatDistanceToNow } from 'date-fns';
import { Router } from '@angular/router';
@Component({
  standalone: true,
  imports: [
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  providers: [PlannerService, AuthService],
  templateUrl: './list-planner-page.component.html',
  styleUrl: './list-planner-page.component.scss'
})
export class ListPlannerPageComponent {
  private plannerService: PlannerService = inject(PlannerService);
  private authService: AuthService = inject(AuthService);
  protected listPlanners: Array<Planner> = [];
  private router: Router = inject(Router);
  private dialog: MatDialog = inject(MatDialog);
  constructor() {
    this.initListPlanners();
  }
  initListPlanners() {
    this.plannerService.listAllPlanner().subscribe(
      response => this.listPlanners = response
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
  addPlanner(){
    this.router.navigate(['planner'])
  }

  getLastUpdate(date: Date): string {
    return formatDistanceToNow(date, { addSuffix: true });
  }
}
