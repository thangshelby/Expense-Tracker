import { Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { DefaultLayout } from './core/layouts/default-layuout/default-layuout';

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
        path: 'finance-alerts',
        loadComponent: () =>
          import('./features/user/finance-alert/finance-alert').then(
            (c) => c.FinancialAlertsComponent,
          ),
      },
      {
        path: 'budget-management',
        loadComponent: () =>
          import('./features/user/budget-management/budget-management').then(
            (c) => c.BudgetManagement,
          ),
      },
      {
        path: 'loan-management',
        loadComponent: () =>
          import('./features/user/loan-management/loan-management').then(
            (c) => c.LoanManagementComponent,
          ),
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
