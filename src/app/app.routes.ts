import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';
import { DefaultLayout } from './components/default-layuout/default-layuout';
import { LoanManagementComponent } from './services/loanmanagement/loan-management/loan-management';
// import { LoginGuard } from './auth/login.guard';

export const routes: Routes = [
  {
    path: 'welcome',
    loadComponent: () =>
      import('./features/authencication/welcome').then((c) => c.Welcome),
    // canActivate: [LoginGuard],
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
          import('./features/user/dashboard/dashboard').then(
            (c) => c.Dashboard,
          ),
      },
      {
        path: 'transactions',
        loadComponent: () =>
          import('./features/user/transactions/transactions').then(
            (c) => c.Transactions,
          ),
      },
      {
        path: 'analytics',
        loadComponent: () =>
          import('./features/user/analytics/analytics').then(
            (c) => c.Analytics,
          ),
      },
      {
        path: 'loan-management',
        component: LoanManagementComponent,

        // loadComponent: () =>
        //   import('./features/loanmanagement/loan-management').then(
        //     (c) => c.LoanManagementComponent,
        //   ),
      },
      {
        path: 'budget-management',
        loadComponent: () =>
          import('./features/user/budget-management/budget-management').then(
            (c) => c.BudgetManagement,
          ),
      },
      {
        path: 'history',
        loadComponent: () =>
          import('./features/user/history/history').then((c) => c.History),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/user/profile/profile').then((c) => c.Profile),
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
