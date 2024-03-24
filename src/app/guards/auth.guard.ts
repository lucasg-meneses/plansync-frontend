// auth.guard.ts

import {  inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

export function AuthGuard(route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot):
  Observable<boolean | UrlTree> |
  Promise<boolean | UrlTree> |
  boolean |
  UrlTree {
  return AuthService.isAuthenticated()
    ? true
    : inject(Router).createUrlTree(['/login']);
}