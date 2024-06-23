import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-todo-card-item',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './todo-card-item.component.html',
  styleUrl: './todo-card-item.component.scss'
})
export class TodoCardItemComponent {

}
