import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivateFn, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  private readonly authService = inject(AuthService);
  constructor() {}
  canActivate() {
    return this.authService.getIsAuth();
  }
}
