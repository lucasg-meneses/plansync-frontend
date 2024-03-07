import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule],
  templateUrl: './login-page.componnent.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';
}