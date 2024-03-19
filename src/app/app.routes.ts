import { Routes } from '@angular/router';
import { LoginPageComponent } from './view/pages/login-page/login-page.component';
import { AuthGuard } from './guards/auth.guard';
import { ListPlannerPageComponent } from './view/pages/list-planner-page/list-planner-page.component';

export const routes: Routes =  [
    { path: 'login', component: LoginPageComponent },
    // Rota protegida por autenticação
    { path: 'planners', canActivate: [AuthGuard], component: ListPlannerPageComponent},
    // Outras rotas...
    { path: '', redirectTo: '/login', pathMatch: 'full' },
  ];
