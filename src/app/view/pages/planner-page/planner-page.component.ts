import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { PlannerService } from '../../../services/planner.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { getWeekdayList } from '../../../models/weekday.model.enum';
import { TodoCardItemComponent } from '../../components/todo-card-item/todo-card-item.component';
import { MatListModule } from '@angular/material/list';
@Component({
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatGridListModule,
    MatListModule,
    TodoCardItemComponent
  ],
  providers: [PlannerService],
  templateUrl: './planner-page.component.html',
  styleUrl: './planner-page.component.scss'
})
export class PlannerPageComponent {

  private editMode: boolean = false;
  protected titlePage: string = 'Planner Details';
  protected form: FormGroup;
  protected tabNameList: Array<string> = getWeekdayList();
  protected indexTab: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private plannerService: PlannerService) {

    this.form = this.formBuilder.group({
      title: ['New Planner', [Validators.required]],
      month: [this.getMonthNow(), [Validators.min(1), Validators.max(12), Validators.required]],
      year: [this.getYearNow(), [Validators.min(this.getYearNow()), Validators.required]]
    })

    this.setContextPage();
  }

  private setContextPage() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === 'new') {
      this.titlePage = 'New Planner';
      this.editMode = true;
      this.disabledForms(false);

    } else {
      this.titlePage = 'Planner Details';
      this.disabledForms(true);
      this.plannerService.getPlannerById(id!).subscribe(
        (response) => {
          this.form.get('title')?.setValue(response.title);
          this.form.get('month')?.setValue(response.month);
          this.form.get('year')?.setValue(response.year);
        }
      );
    }
    this.indexTab = this.getWeekdayNow() - 1;
  }

  protected savePlanner() {

  }
  protected backToPlanners() {
    this.router.navigate(['planners']);
  }
  protected setEditMode(edit: boolean) {
    this.editMode = edit;
  }
  protected getEditMode(): boolean {
    return this.editMode;
  }

  private disabledForms(disabled: boolean) {
    if (disabled) {
      this.form.get('title')?.disable();
      this.form.get('month')?.disable();
      this.form.get('year')?.disable();
    } else {
      this.form.get('title')?.enable();
      this.form.get('month')?.enable();
      this.form.get('year')?.enable();
    }
    console.log(this.getWeekdayNow())
  }

  protected getWeekdayNow() {
    return new Date().getDay()
  }
  protected getYearNow() {
    return new Date().getFullYear();
  }
  protected getMonthNow() {
    return new Date().getMonth();
  }
}
