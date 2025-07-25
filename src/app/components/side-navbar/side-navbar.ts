import { Component, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SideNavbarItemType } from '../../types/type';
import { Store } from '@ngxs/store';
import { ThemeState } from '../../store/theme.state';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-side-navbar',
  imports: [MatButtonModule, MatIconModule, CommonModule, AsyncPipe],
  templateUrl: './side-navbar.html',
  styleUrl: './side-navbar.css',
})
export class SideNavbar implements OnInit {
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
        icon: 'pi-objects-column',
        title: 'Dashboard',
      },
      {
        key: 'transactions',
        icon: 'pi-receipt',
        title: 'Transactions',
      },
      {
        key: 'analytics',
        icon: 'pi-chart-bar',
        title: 'Analytics',
      },
      {
        key: 'history',
        icon: 'pi-history',
        title: 'History',
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
