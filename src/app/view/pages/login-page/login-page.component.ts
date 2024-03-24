import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Credentials } from '../../../models/auth/credentials.model';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService],
  templateUrl: './login-page.componnent.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  private authService = inject(AuthService);
  public router: Router = inject(Router);

  protected formService = inject(FormBuilder);
  protected formLogin = this.formService.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  login() {
    const username = this.formLogin.get('username');
    const password = this.formLogin.get('password');
    let credentials = {} as Credentials;
    credentials.login = username?.value!;
    credentials.password = password?.value!;

    this.authService.login(credentials).subscribe((response) => {
      if(response.token !== null){
        this.router.navigate(['/planners']);
      }
    });
    
  }

}