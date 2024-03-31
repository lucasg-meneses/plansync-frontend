import { Component, inject } from '@angular/core';
import { AuthModalPageTemplateComponent } from '../../components/auth-modal-page-template/auth-modal-page-template.component';
import { MatCardContent } from '@angular/material/card';
import { AuthService } from '../../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import UserModel from '../../../models/auth/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardContent,
    AuthModalPageTemplateComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {
  private authService = inject(AuthService);
  public router: Router = inject(Router);
  private snackBar: MatSnackBar = inject(MatSnackBar);

  protected formService = inject(FormBuilder);
  protected formRegister = this.formService.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    confirmpassword: ['', Validators.required],
    email: ['', Validators.required]
  });


  redirectToLogin() {
    this.router.navigate(['/login'])
  }
  register() {
    const username = this.formRegister.value.username!;
    const email = this.formRegister.value.email!;
    const password = this.formRegister.value.password!;
    const confirmPassword = this.formRegister.value.confirmpassword;
    if (password !== confirmPassword) {
      this.snackBar.open('Passwords do not match.', 'Close', {
        duration: 5000,
        panelClass: ['snackbar-error']
      });
    } else {

      const userModel: UserModel = new UserModel(username, password, email);
      this.authService.register(userModel).subscribe((response) => {
        this.router.navigate(['/login']);
      });


    }

  }

}
