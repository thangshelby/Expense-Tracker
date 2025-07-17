import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { DefaultLayout } from './features/default-layuout/default-layuout';
import { LoginGuard } from './auth/login.guard';

export const routes: Routes = [
  {
    path: 'welcome',
    loadComponent: () =>
      import('./features/authencication/welcome').then((c) => c.Welcome),
    canActivate: [LoginGuard],
    children: [
      {
        path: 'log-in',
        loadComponent: () =>
          import('./features/authencication/login/log-in').then((c) => c.LogIn),
      },

      {
        path: 'sign-up',
        loadComponent: () =>
          import('./features/authencication/signup/sign-up').then(
            (c) => c.SignUp,
          ),
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'log-in',
      },
    ],
  },
  {
    path: '',
    component: DefaultLayout,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./features/home/home').then((c) => c.Home),
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard').then((c) => c.Dashboard),
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'welcome',
  },
];
