import { Component } from '@angular/core';
import {MatListModule} from '@angular/material/list';
@Component({
  standalone: true,
  imports: [MatListModule],
  templateUrl: './list-planner-page.component.html',
  styles: ``
})
export class ListPlannerPageComponent {

  plannerNameList: String[] = ["Planner Aulas de Ginastica", "planner Escola"]
  printf(plannerName : String){
    console.log(`Click, ${plannerName}`);
  }
}
