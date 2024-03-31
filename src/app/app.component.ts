import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { ListPlannerPageComponent } from "./view/pages/list-planner-page/list-planner-page.component";
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styles: [],
  imports: [
    RouterOutlet,
    HttpClientModule,
    MatToolbar,
    ListPlannerPageComponent]
})
export class AppComponent {
  title: String = 'PlanSync';
  author: String = 'Lucas G. Meneses'
}
