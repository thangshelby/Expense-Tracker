import { Component, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SideNavbarItemType } from '../../types/type';

@Component({
  selector: 'app-side-navbar',
  imports: [MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './side-navbar.html',
  styleUrl: './side-navbar.css',
})
export class SideNavbar implements OnInit {
  sideNavItems = signal<SideNavbarItemType[]>([]);
  activatedSideNavItem = '';
  constructor(private router: Router) {
    this.activatedSideNavItem = router.url.split('/')[1];
  }

  ngOnInit() {
    this.sideNavItems.update((prev) => [
      ...prev,
      {
        key: 'dashboard',
        icon: 'dashboard',
        title: 'Dashboard',
        click: () => this.router.navigate(['/dashboard']),
      },
      {
        key: 'payments',
        icon: 'payments',
        title: 'Payments',
        click: () => {
          this.router.navigate(['/payments']);
        },
      },
      {
        key: 'analytics',
        icon: 'analytics',
        title: 'Analytics',
        click: () => this.router.navigate(['/analytics']),
      },
      {
        key: 'history',
        icon: 'history',
        title: 'History',
        click: () => this.router.navigate(['/history']),
      },
      {
        key: 'settings',
        icon: 'settings',
        title: 'Settings',
        click: () => this.router.navigate(['/settings']),
      },
    ]);
  }
}
