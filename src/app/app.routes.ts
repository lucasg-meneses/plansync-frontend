import { Routes } from '@angular/router';
import { LoginPageComponent } from './view/pages/login-page/login-page.component';
import { AuthGuard } from './guards/auth.guard';
import { ListPlannerPageComponent } from './view/pages/list-planner-page/list-planner-page.component';
import { RegisterPageComponent } from './view/pages/register-page/register-page.component';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  // Rota protegida por autenticação
  { path: 'planners', canActivate: [AuthGuard], component: ListPlannerPageComponent },
  // Outras rotas...
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];
