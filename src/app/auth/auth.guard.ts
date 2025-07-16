// import { Injectable, inject } from '@angular/core';
// import { AuthService } from './auth.service';
// import { CanActivateFn, CanActivate } from '@angular/router';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard {
//   private readonly authService = inject(AuthService);
//   constructor() {}
//   canActivate() {
//     return this.authService.getIsAuth();
//   }
// }

import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    map((user) => {
      if (user) {
        return true;
      } else {
        router.navigate(['']);
        return false;
      }
    }),
  );
};
