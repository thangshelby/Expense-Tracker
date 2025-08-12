import { Component, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SideNavbarItemType } from '../../../../../shared/types/type';
import { Store } from '@ngxs/store';
import { ThemeState } from '../../../../store/theme.state';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import {
  LucideAngularModule,
  LayoutDashboardIcon,
  ChartAreaIcon,
  SirenIcon,
  CalculatorIcon,
  PiggyBankIcon,
  CreditCardIcon,
  FileIcon,
  ChartArea,
} from 'lucide-angular';

@Component({
  selector: 'app-side-navbar',
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
    AsyncPipe,
    LucideAngularModule,
  ],
  templateUrl: './side-navbar.html',
  styleUrl: './side-navbar.css',
})
export class SideNavbar implements OnInit {
  readonly LayoutDashboardIcon = LayoutDashboardIcon;
  readonly ChartAreaIcon = ChartAreaIcon; //analytic
  readonly SirenIcon = SirenIcon; //alert
  readonly CalculatorIcon = CalculatorIcon; //tran
  readonly PiggyBankIcon = PiggyBankIcon; //budget
  readonly CreditCardIcon = CreditCardIcon; //loan
  readonly FileIcon = FileIcon;

  sideNavItems = signal<SideNavbarItemType[]>([]);
  activatedSideNavItem = signal<string>('');
  constructor(
    private router: Router,
    private store: Store,
  ) {
    this.activatedSideNavItem.update(() => {
      return router.url.split('/')[1];
    });
  }
  isDark$!: Observable<boolean>;

  ngOnInit() {
    this.isDark$ = this.store.select(ThemeState.isDarkMode);

    this.sideNavItems.update((prev) => [
      ...prev,
      {
        key: 'dashboard',
        icon: LayoutDashboardIcon,
        title: 'Dashboard',
      },
      {
        key: 'transactions',
        icon: CalculatorIcon,
        title: 'Transactions',
      },

      // {
      //   key: 'analytics',
      //   icon: ChartAreaIcon,
      //   title: 'Analytics',
      // },
      {
        key: 'budget-management',
        icon: PiggyBankIcon,
        title: 'Budget Management',
      },
      {
        key: 'loan-management',
        icon: CreditCardIcon,
        title: 'Loan Management',
      },

      {
        key: 'finance-alerts',
        icon: SirenIcon,
        title: 'Finance Alert',
      },
    ]);
  }

  onSideNavItemClick(path: string) {
    this.router.navigate([path]);
    this.activatedSideNavItem.update(() => {
      return path;
    });
  }
}
