import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { DefaultLayout } from './components/default-layuout/default-layuout';

export const routes: Routes = [
  {
    path: 'welcome',
    loadComponent: () =>
      import('./components/welcome/welcome').then((c) => c.Welcome),
    children: [
      {
        path: 'log-in',
        loadComponent: () =>
          import('./components/welcome/login/log-in').then((c) => c.LogIn),
      },

      {
        path: 'sign-up',
        loadComponent: () =>
          import('./components/welcome/signup/sign-up').then((c) => c.SignUp),
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
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./components/home/home').then((c) => c.Home),
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./components/dashboard/dashboard').then((c) => c.Dashboard),
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
